import { Injectable } from '@nestjs/common';
import { FileCheckerService } from '../file-checker.service';
import { extractedTexts } from './tc-page-service';

@Injectable()
export class MainPages {
    constructor(private readonly fileChecker: FileCheckerService) { }

    extractedText = (inputString) => {
        const textInsideWTagRegex = /<w:t[^>]*>([^<]*)/g;

        const matches = [...inputString.matchAll(textInsideWTagRegex)];

        return matches.map(match => match[1].trim()).filter(text => text !== '');
    };

    checkTableImageName(xmlData: string, tableRegex: RegExp): boolean {
        // Извлекаем весь текст из тегов <w:t>
        const textMatches = xmlData.match(/<w:t[^>]*>([^<]*)<\/w:t>/gi);
        
        // Объединяем текст, удаляем пробелы и нормализуем
        const combinedText = textMatches
            .map(match => match.replace(/<[^>]+>/g, '').trim()) // Удаляем теги и лишние пробелы
            .join(' ') // Объединяем фрагменты
            .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
            .replace(/[–-]/g, '–'); // Нормализуем тире
    
        // Проверяем соответствие шаблону
        return tableRegex.test(combinedText);
    }

    removeUnnecessaryDots = (data: string[]): string[] => {
        return data.map(item =>
            item.replace(/(?<=[а-яёa-z])(\s*\.+)+(?=\s|$)/gi, '') // Удаляем точки после букв
                .replace(/(\s*\.+)+(?=\s|$)/g, '') // Удаляем точки перед пробелами
        );
    };

    extractLastWordsBeforeNumbers(data: string[]): string[] {
        const result: string[] = [];

        for (let i = 0; i < data.length; i++) {
            const current = data[i].trim();

            // Проверяем, является ли текущий элемент числом
            if (/^\d+$/.test(current)) {
                // Находим последнее непустое значение перед числом
                let j = i - 1;
                while (j >= 0 && data[j].trim() === '') {
                    j--;
                }

                if (j >= 0) {
                    const previous = data[j].trim();

                    // Проверяем, что предыдущее значение не является числом
                    if (!/^\d+$/.test(previous)) {
                        const lastWord = previous.split(/\s+/).pop();
                        if (lastWord) {
                            result.push(lastWord);
                        }
                    }
                }
            }
        }

        return result;
    }

    findStratEndIndexes(xmlData: string): number[] {
        const paragraphs = xmlData.split(/(<w:p\b[^>]*>[\s\S]*?<\/w:p>)/gi)
            .filter(paragraph => paragraph.trim() !== '');

        let startIndex = 0;

        function findValidIntroductionIndex(paragraphs: string[]): number {
            for (let i = 0; i < paragraphs.length - 1; i++) {
                const current = paragraphs[i];
                const next = paragraphs[i + 1];

                const isExactIntroduction = /<w:t[^>]*>\s*введение\s*<\/w:t>/i.test(current);
                const nextHasTextTag = /<w:t[^>]*>.*?<\/w:t>/i.test(next);

                if (isExactIntroduction && !nextHasTextTag) {
                    return i;
                }
            }

            return -1;
        }

        const introductionIndex = findValidIntroductionIndex(paragraphs);

        // const introductionIndex = paragraphs.findIndex(p =>
        //     /<w:t[^>]*>\s*введение\s*<\/w:t>/i.test(p)
        // );

        // console.log(paragraphs[introductionIndex]);

        const listOfTermsIndex = paragraphs.findIndex(p =>
            /<w:t[^>]*>\s*перечень сокращений и обозначений\s*<\/w:t>/i.test(p)
        );

        if (introductionIndex === -1 || listOfTermsIndex === -1) {
            startIndex = Math.max(introductionIndex, listOfTermsIndex);
        } else {
            startIndex = Math.min(introductionIndex, listOfTermsIndex);
        }

        let sourcesListIndex = -1;
        let applicationIndex = -1;

        for (let i = paragraphs.length - 1; i >= 0; i--) {
            if (paragraphs[i].toLowerCase().includes('список использованных источников')) {
                sourcesListIndex = i;
                break;
            }
        }

        for (let i = paragraphs.length - 1; i >= 0; i--) {
            if (paragraphs[i].toLowerCase().includes('приложение')) {
                applicationIndex = i;
                break;
            }
        }

        const endIndex = Math.max(sourcesListIndex, applicationIndex);

        return [startIndex, endIndex];
    }

    mainPages(xmlData: string): string {
        const paragraphs = xmlData.split(/(<w:p\b[^>]*>[\s\S]*?<\/w:p>)/gi)
            .filter(paragraph => paragraph.trim() !== '');

        const singleDigitRegex = /^\d{1,2}(?!\.\d)\s.+/;
        const digitWithPointRegex = /\d{1,2}\.\d[\s\u00A0]/g;
        const doublePointRegex = /\d{1,2}\.\d\.\d\s/g;
        const drawningChecker = /Рисунок\s+\d{1,2}\s+[–]/g;
        const drawningCount = /рисун[а-яё]{2,3}\s\d{1,2}\b/g;
        const tablesChecker = /Таблица\s+\d{1,2}\s+[–]/g;
        const tablesCount = /таблиц[а-яё]{1,3}\s\d{1,2}\b/g;
        const keywords = [
            "перечень сокращений и обозначений",
            "введение",
            "заключение",
            "список использованных источников",
            "приложение"
        ];

        const extractedTextsCopy = this.removeUnnecessaryDots(extractedTexts)
        
        const filteredData = extractedTextsCopy.filter(item => {
            const lowerItem = item.toLowerCase().trim();

            return (
                singleDigitRegex.test(lowerItem) ||
                digitWithPointRegex.test(lowerItem) ||
                doublePointRegex.test(lowerItem) ||
                keywords.some(keyword => lowerItem.startsWith(keyword))
            );
        });

        const removeTrailingNumbers = (line: string) =>
            line.replace(/\s*(\d+\s*)+$/, '');

        // Восстанавливаем данные
        const restoredTexts: string[] = [];
        let buffer: string[] = [];

        extractedTextsCopy.forEach((line) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return; // Пропускаем пустые строки

            // Если строка есть в фильтрованном массиве, сохраняем буфер
            if (filteredData.some((filtered) => trimmedLine.startsWith(filtered))) {
                if (buffer.length > 0) {
                    const combined = buffer.join(' ').trim();
                    restoredTexts.push(removeTrailingNumbers(combined));
                    buffer = [];
                }
                buffer.push(trimmedLine);
            } else {
                // Добавляем строки в буфер
                buffer.push(trimmedLine);
            }
        });

        // Обрабатываем оставшийся буфер
        if (buffer.length > 0) {
            const combined = buffer.join(' ').trim();
            restoredTexts.push(removeTrailingNumbers(combined));
        }

        // console.log(restoredTexts[0]);

        const startIndex = this.findStratEndIndexes(xmlData)[0];
        const endIndex = this.findStratEndIndexes(xmlData)[1];

        for (let i = startIndex; i < endIndex; i++) {
            paragraphs[i] = this.fileChecker.replaceLineSpacing(
                this.fileChecker.replaceIndentation(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.removeTextHighlighting(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                            "0"),
                                        "both"
                                    )
                                )
                            )
                        )
                    )
                ), "360"
            );
        }

        let currentAligment = "center";
        let currentFontSize = "30";
        let titleCounter = 0;
        let startPageBreak = 0;
        let countTables = 0;
        let countDrawings = 0;
        let drawningCountChecker = 0;
        let tablesCountChecker = 0;
        let skipTrigger: number = 0;

        // Рисунки и таблицы должны иметь соответсвующую подпись и упоминание в тексте
        // Источники должны иметь упоминания в тексте
        // Таблицы

        for (let i = startIndex; i < paragraphs.length; i++) {
            //ТАБЛИЦЫ
            if (paragraphs[i].includes('<w:tbl>')) {
                countTables++;
                let tableCreator = false;
                this.checkTableImageName(paragraphs[i - 1], tablesChecker);
                if (!tablesChecker.test(paragraphs[i - 1])) {
                    const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i - 1]);
                    const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i - 1]);
                    this.fileChecker.addTextParagraphWP(paragraphs, textId, rsid, i, "28",
                        `Таблица ${countTables} – (ВВЕДИТЕ НАЗВАНИЕ ВАШЕЙ ТАБЛИЦЫ)`);
                    tableCreator = true;
                }

                if (tableCreator === true) i++;
                paragraphs[i - 1] = this.fileChecker.replaceIndentation(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.removeTextHighlighting(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i - 1], "28"),
                                            "0"),
                                        "left"
                                    )
                                )
                            )
                        )
                    ),
                    "0", "0", "0"
                );

                let counter = i - 1;
                while (paragraphs[counter] === '' ||
                    paragraphs[counter].includes('</w:r>')) {
                    if (paragraphs[counter].includes('</w:r>')) {
                        const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i]);
                        const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i]);
                        this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter, "28");
                        break;
                    }
                    counter--;
                }

                i++;
                continue;
            }

            if (paragraphs[i].includes('</w:tbl>')) {
                let counter = i + 1;
                while (paragraphs[counter] === '' || 
                    paragraphs[counter].includes('</w:r>')) {
                    if (paragraphs[counter].includes('</w:r>')) {
                        const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i + 1]);
                        const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i + 1]);
                        this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter, "28");
                        break;
                    }
                    counter++;
                }

                i++;
                continue;
            }


            //ИЛЛЮСТРАЦИИ
            if (paragraphs[i].includes('<w:drawing>')) {
                countDrawings++;

                let counter = i - 1;
                while (paragraphs[counter] === '' ||
                    paragraphs[counter].includes('</w:r>')) {
                    if (paragraphs[counter].includes('</w:r>')) {
                        const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[counter]);
                        const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[counter]);
                        this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter + 1, "28");
                        i++;
                        break;
                    }
                    counter--;
                }

                counter = i + 1;
                while (paragraphs[counter] === '' || 
                    paragraphs[counter].includes('</w:r>')) {
                    if (paragraphs[counter].includes('</w:r>')) {
                        const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i + 1]);
                        const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i + 1]);
                        this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter, "28");
                        i++;
                        break;
                    }
                    counter++;
                }

                paragraphs[i - 1] = this.fileChecker.replaceIndentation(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.removeTextHighlighting(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i - 1], "28"),
                                            "0"),
                                        "center"
                                    )
                                )
                            )
                        )
                    ),
                    "0", "0", "0"
                );

                if (!this.checkTableImageName(paragraphs[i + 1], drawningChecker)) {
                    const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i]);
                    const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i]);
                    this.fileChecker.addTextParagraphWP(paragraphs, textId, rsid, i + 1, "28",
                        `Рисунок ${countDrawings} – (ВВЕДИТЕ НАЗВАНИЕ ВАШЕГО РИСУНКА)`);
                }
                i++;

                paragraphs[i] = this.fileChecker.replaceIndentation(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.removeTextHighlighting(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                            "0"),
                                        "center"
                                    )
                                )
                            )
                        )
                    ),
                    "0", "0", "0"
                );

                counter = i + 1;
                while (paragraphs[counter] === '' || 
                    paragraphs[counter].includes('</w:r>')) {
                    if (paragraphs[counter].includes('</w:r>')) {
                        const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i + 1]);
                        const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i + 1]);
                        this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter, "28");
                        i++;
                        break;
                    }
                    counter++;
                }

                continue;
            }

            if (paragraphs[i].includes('Анализ и проектирование требований')) {
                console.log(i);
            }
            //ЗАГОЛОВКИ
            const extractedText = this.extractedText(paragraphs[i]);
            if (extractedText.length == 0) continue;
            if (extractedText[0].toLowerCase() === restoredTexts[titleCounter].toLowerCase()
                || extractedText[0].toLowerCase().includes('приложение')
                || (restoredTexts[titleCounter].toLowerCase().includes(extractedText[0].toLowerCase())
                && paragraphs[i].includes('<w:bookmarkStart'))) {
                if (keywords.some(keyword => restoredTexts[titleCounter].toLowerCase().includes(keyword)) ||
                    singleDigitRegex.test(restoredTexts[titleCounter])) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (paragraphs[j].includes('</w:r>')) {
                            startPageBreak = j;
                            break;
                        } else paragraphs[j] = '';
                    }

                    [
                        paragraphs[startPageBreak],
                        paragraphs[i]
                    ] = this.fileChecker.makePageBreak(paragraphs[startPageBreak], paragraphs[i]);
                    let counter = i + 1;

                    while (paragraphs[counter] === '' || paragraphs[counter].includes('</w:r>')) {
                        if (paragraphs[counter].includes('</w:r>')) {
                            const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i]);
                            const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i]);
                            this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter, "28");
                            break;
                        }
                        counter++;
                    }

                    paragraphs[i] = paragraphs[i].replace( 
                        new RegExp(`(${keywords.join('|')})`, 'gi'),
                        match => match.toUpperCase()
                    );

                    if (singleDigitRegex.test(restoredTexts[titleCounter])) currentAligment = "left";
                    else currentAligment = "center";
                    currentFontSize = "32";

                    if (titleCounter < restoredTexts.length - 1 && restoredTexts[titleCounter].toLowerCase().includes(extractedText[0].toLowerCase())) {
                        titleCounter++; 
                    }

                } else if (digitWithPointRegex.test(restoredTexts[titleCounter]) ||
                    doublePointRegex.test(restoredTexts[titleCounter])) {
                    let counter = i + 1;
                    while (paragraphs[counter] === '' || paragraphs[counter].includes('</w:r>')) {
                        if (paragraphs[counter].includes('</w:r>')) {
                            const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i]);
                            const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i]);
                            this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter, "28");
                            break;
                        }
                        counter++;
                    }

                    counter = i - 1;
                    while (paragraphs[counter] === '' || paragraphs[counter].includes('</w:r>')) {
                        if (paragraphs[counter].includes('</w:r>')) {
                            const rsid = this.fileChecker.getRsidFromParagraph(paragraphs[i]);
                            const textId = this.fileChecker.getTextIdFromParagraph(paragraphs[i]);
                            this.fileChecker.addEmptyParagraphWP(paragraphs, textId, rsid, counter + 1, "28");
                            i++;
                            break;
                        }
                        counter--;
                    }

                    if (titleCounter < restoredTexts.length - 1 && restoredTexts[titleCounter].toLowerCase().includes(extractedText[0].toLowerCase())) {
                        titleCounter++; 
                    }

                    currentAligment = "left";
                    currentFontSize = "30";
                } else if (singleDigitRegex.test(extractedText.join(' ').trim())) {
                    if (titleCounter < restoredTexts.length - 1 && restoredTexts[titleCounter].toLowerCase().includes(extractedText[0].toLowerCase())) {
                        titleCounter++; 
                    }
                    currentAligment = "left";
                    currentFontSize = "32";
                } else {
                    if (titleCounter < restoredTexts.length - 1 && restoredTexts[titleCounter].toLowerCase().includes(extractedText[0].toLowerCase())) {
                        titleCounter++; 
                    }
                    currentAligment = "left";
                    currentFontSize = "30";
                }
                paragraphs[i] = this.fileChecker.replaceIndentation(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.removeTextHighlighting(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], currentFontSize),
                                            "0"),
                                        currentAligment
                                    )
                                )
                            )
                        )
                    )
                ); 
            } else if (keywords.some(keyword => extractedText[0].toLowerCase().includes(keyword)) ||
                singleDigitRegex.test(extractedText.join(' ').trim()) ||
                digitWithPointRegex.test(extractedText.join(' ').trim()) ||
                doublePointRegex.test(extractedText.join(' ').trim())) {
                    if (i === skipTrigger) continue;
                    skipTrigger = i;
                    this.fileChecker.mergeTextBlocks(paragraphs, restoredTexts[titleCounter], i);
                    i--;
            }
        }

        for (let i = startIndex; i < paragraphs.length; i++) {
            if (drawningCount.test(paragraphs[i])) {
                drawningCountChecker++;
            }

            if (tablesCount.test(paragraphs[i])) {
                tablesCountChecker++;
            }
        }

        console.log(drawningCountChecker);
        console.log(tablesCountChecker);

        restoredTexts.length = 0;
        buffer.length = 0;
        return paragraphs.join('');
    }
}