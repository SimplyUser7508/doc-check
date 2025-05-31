import { Injectable } from '@nestjs/common';
import { FileCheckerService } from '../file-checker.service';

@Injectable()
export class ReferatPage {
    constructor(private readonly fileChecker: FileCheckerService) {}

    async countPagesFromFooters(relsFileContent: string, zip: PizZip): Promise<number> {
        const xml2js = require('xml2js');
    
        // Парсим содержимое файла _rels/document.xml.rels
        const relsXml = await xml2js.parseStringPromise(relsFileContent);
    
        // Находим пути к файлам нижнего колонтитула
        const footerPaths = relsXml.Relationships.Relationship
            .filter((rel: any) => rel.$.Type.includes('footer'))
            .map((rel: any) => `word/${rel.$.Target}`);
    
        if (footerPaths.length === 0) {
            console.error("В документе нет нижнего колонтитула.");
            return 0;
        }
    
        // Обрабатываем только последний файл колонтитула
        const lastFooterPath = footerPaths[footerPaths.length - 1];
        const lastFooterFile = zip.files[lastFooterPath];
    
        if (!lastFooterFile) {
            console.warn(`Файл ${lastFooterPath} не найден в архиве.`);
            return 0;
        }
    
        const footerContent = lastFooterFile.asText();
    
        const footerXml = await xml2js.parseStringPromise(footerContent);
    
        // Извлекаем последний номер страницы
        const pageNumbers = this.extractPageNumbers(footerXml);
    
        const maxPageNumber = Math.max(...pageNumbers, 0); // Если массив пустой, вернуть 0
        // console.log("Общее количество страниц:", maxPageNumber);
    
        return maxPageNumber;
    }
    
    
    private extractPageNumbers(footerXml: any): number[] {
        const pageNumbers: number[] = [];
        // console.log("Содержимое XML колонтитула:", JSON.stringify(footerXml, null, 2));
    
        // Проверяем наличие секции <w:sdtContent>
        const sdtContent = footerXml['w:ftr']?.['w:sdt']?.[0]?.['w:sdtContent']?.[0];
        if (!sdtContent) {
            console.warn("Колонтитул не содержит теги <w:sdtContent>.");
            return pageNumbers;
        }
    
        // Проходим по всем абзацам <w:p>
        const paragraphs = sdtContent['w:p'];
        if (!paragraphs) {
            console.warn("Абзацы <w:p> не найдены в <w:sdtContent>.");
            return pageNumbers;
        }
    
        paragraphs.forEach((p: any) => {
            const runs = p['w:r'];
            if (!runs) return;
    
            let isPageField = false;
    
            runs.forEach((r: any) => {
                const instrText = r['w:instrText']?.[0];
                const text = r['w:t']?.[0];
    
                if (instrText?.includes('PAGE')) {
                    isPageField = true; // Найдено поле PAGE
                }
    
                if (isPageField && text && !isNaN(Number(text))) {
                    pageNumbers.push(Number(text));
                    isPageField = false; // Сбрасываем после нахождения номера
                }
            });
        });
        
        return pageNumbers;
    }
    

    countDrawings(xmlData: string): number {
        return (xmlData.match(/<w:drawing>/g) || []).length;
    }

    countTables(xmlData: string): number {
        const tables = xmlData.match(/<w:tbl>[\s\S]*?<\/w:tbl>/g) || [];
        
        let tableCount = tables.length;
        
        tables.forEach(table => {
            if (table.includes("Введение . . .")) {
                tableCount -= 1;
            }
        });

        return tableCount;
    }


    countSources(paragraphs: string[]): number {
        const applicationRegex = /\d{1,2}\.\s/g;
        let count = 0;
        paragraphs.forEach(p => {
            if (applicationRegex.test(p)) {
                count++;
            }
        });
    
        return count;
    }

    countApplications(paragraphs: string[]): number {
        const applicationRegex = /ПРИЛОЖЕНИЕ\s[А-Я]/g;
        let count = 0;
    
        paragraphs.forEach(p => {
            if (applicationRegex.test(p)) {
                count++;
            }
        });
    
        return count; 
    }

    ensureUppercaseInWT(paragraph: string): string {
        const uppercaseRegex = /^[A-ZА-ЯЁ]+$/;
        return paragraph.replace(/<w:t>(.*?)<\/w:t>/g, (match, text) => {
            if (uppercaseRegex.test(text)) {
                return match;
            }
            const uppercasedText = text.toUpperCase();
            return `<w:t>${uppercasedText}</w:t>`;
        });
    }

    referatPage(xmlData: string): string {
        const paragraphs = xmlData.split(/<\/w:p>/g);
        const referatIndex: number = paragraphs.findIndex(p => p.toLowerCase().includes('реферат'));
        let keywordsListIndex: number = -1;
        for (let i = referatIndex + 1; i < paragraphs.length; i++) {
            if (paragraphs[i].toLowerCase().includes('выпускная квалификационная работа')) {
                keywordsListIndex = i + 1;
                break;
            }
        }
        const drawings = this.countDrawings(xmlData);
        const tables = this.countTables(xmlData);
        const sources = this.countSources(paragraphs);
        const applications = this.countApplications(paragraphs);

        if (keywordsListIndex === -1) {
            const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[referatIndex + 1]);
            const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[referatIndex + 1]);
            this.fileChecker.addTextParagraph(paragraphs, textId, rsid, referatIndex + 1, "28",
                `Выпускная квалификационная работа (Ваше количество страниц - число) с., ${drawings} рис., ${tables} табл., ${applications} источн., ${sources} прил.`);
            keywordsListIndex = referatIndex + 2;
        }
        
        const thesisContentIndex = paragraphs.findIndex(p => p.toLowerCase().includes('содержание'));
        if (referatIndex !== -1) {
            paragraphs[referatIndex] = paragraphs[referatIndex].replace(/реферат/gi, match => match.toUpperCase());
        }
        
        if (thesisContentIndex !== -1) {
            paragraphs[thesisContentIndex] = paragraphs[thesisContentIndex].replace(/содержание/gi, match => match.toUpperCase());
        }                

        if (referatIndex === -1 || thesisContentIndex === -1) {
            throw new Error("Ключевые слова 'Реферат' или 'Содержание' не найдены.");
        }
        
        // console.error("Отладочная информация:", { referatIndex, thesisContentIndex });
        
        // console.log(`Рисунков: ${drawings}`);
        // console.log(`Таблиц: ${tables}`);
        // console.log(`Источников: ${sources}`);
        // console.log(`Приложений: ${applications}`);
        // console.log(paragraphs[referatIndex + 2]);

        paragraphs[keywordsListIndex] = this.ensureUppercaseInWT(paragraphs[keywordsListIndex]);

        paragraphs[referatIndex] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceAlignment(
                        this.fileChecker.replaceLetterSpacing(
                            this.fileChecker.replaceFontSize(paragraphs[referatIndex], "32"), 
                        "0"),
                        "center"
                    )
                )
            )
        );
        if (this.fileChecker.isEmptyOrWhitespace(paragraphs[referatIndex + 1]) === false) {
            const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[referatIndex]);
            const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[referatIndex]);
            this.fileChecker.addEmptyParagraph(paragraphs, textId, rsid, referatIndex + 1, "28");
        } else {
            paragraphs[referatIndex + 1] = this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[referatIndex + 1], "28"), 
                            "0"),
                            "both"
                        )
                    )
                )
            );
        }
        for (let i = keywordsListIndex; i <= thesisContentIndex; i++) {
            paragraphs[i] = this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[i], "28"), 
                            "0"),
                            "both"
                        )
                    )
                )
            );
        }

        return paragraphs.join('</w:p>');
    }
}