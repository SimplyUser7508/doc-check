import { Injectable } from "@nestjs/common";

@Injectable()
export class FileCheckerService {

    replaceFont(xmlData: string): string {
        let updatedXmlData = xmlData.replace(/w:asciiTheme="[^"]*"/g, 'w:ascii="Times New Roman"');
        updatedXmlData = updatedXmlData.replace(/w:ascii="[^"]*"/g, 'w:ascii="Times New Roman"');
        updatedXmlData = updatedXmlData.replace(/w:hAnsiTheme="[^"]*"/g, 'w:hAnsi="Times New Roman"');
        updatedXmlData = updatedXmlData.replace(/w:hAnsi="[^"]*"/g, 'w:hAnsi="Times New Roman"');
        updatedXmlData = updatedXmlData.replace(/w:eastAsiaTheme="[^"]*"/g, 'w:eastAsia="Times New Roman"');
        updatedXmlData = updatedXmlData.replace(/w:cstheme="[^"]*"/g, 'w:cs="Times New Roman"');
        updatedXmlData = updatedXmlData.replace(/w:eastAsia="[^"]*"/g, 'w:eastAsia="Times New Roman"');

        return updatedXmlData;
    }

    replacePageMargins(xmlData: string): string {
        let updatedXmlData = xmlData;
    
        updatedXmlData = updatedXmlData.replace(/w:top="[^"]*"/g, `w:top="1134"`);
        updatedXmlData = updatedXmlData.replace(/w:right="[^"]*"/g, `w:right="850"`);
        updatedXmlData = updatedXmlData.replace(/w:bottom="[^"]*"/g, `w:bottom="1134"`);
        updatedXmlData = updatedXmlData.replace(/w:left="[^"]*"/g, `w:left="1701"`);
        updatedXmlData = updatedXmlData.replace(/w:header="[^"]*"/g, `w:header="708"`);
        updatedXmlData = updatedXmlData.replace(/w:footer="[^"]*"/g, `w:footer="708"`);
        updatedXmlData = updatedXmlData.replace(/w:gutter="[^"]*"/g, `w:gutter="0"`);
    
        return updatedXmlData;
    }

    replaceParagraphIndents(xmlData: string, left: string, firstLine: string): string {
        return xmlData.replace(/<w:ind[^>]*\/>/g, `<w:ind w:left="${left}" w:firstLine="${firstLine}"/>`);
    }    

    removeUnderline(xmlData: string): string {
        let updatedXmlData = xmlData.replace(/w:u w:val="[^"]*"/g, 'w:u w:val="none"');
        updatedXmlData = updatedXmlData.replace(/w:rStyle w:val="[^"]*"/g, `w:rStyle w:val="NoUnderline"`);
        return updatedXmlData;
    }

    makeBold(xmlData: string): string {
        return xmlData.replace(/<w:rPr>/g, `<w:rPr><w:b/><w:bCs/>`);
    }

    removeBold(xmlData: string): string {
        return xmlData.replace(/<w:b\/>/g, '').replace(/<w:bCs\/>/g, '');
    }

    makeItalics(xmlData: string): string {
        return xmlData.replace(/<w:rPr>/g, `<w:rPr><w:i/><w:iCs/>`);
    }

    removeItalics(xmlData: string): string {
        return xmlData.replace(/<w:i\/>/g, '').replace(/<w:iCs\/>/g, '');
    }

    replaceColor(xmlData: string): string {
        return xmlData.replace(/w:color w:val="[^"]*"/g, 'w:color w:val="000000"'); // "000000" = black
    }

    replaceFontSize(xmlData: string, size: string): string {
        return xmlData.replace(/w:sz w:val="[^"]*"/g, `w:sz w:val="${size}"`)
                      .replace(/w:szCs w:val="[^"]*"/g, `w:szCs w:val="${size}"`);
    }

    replaceLetterSpacing(xmlData: string, size: string): string {
        return xmlData.replace(/<w:rPr>([\s\S]*?)<\/w:rPr>/g, (match, content) => {
            if (/w:spacing w:val="[^"]*"/.test(content)) {
                return match.replace(/w:spacing w:val="[^"]*"/g, `w:spacing w:val="${size}"`);
            } else {
                return match.replace('</w:rPr>', `<w:spacing w:val="${size}"/></w:rPr>`);
            }
        });
    }

    replaceLineSpacing(xmlData: string, lineSize: string): string {
        return xmlData.replace(/<w:spacing w:line="[^"]*"/g, `<w:spacing w:line="${lineSize}"`);
    }

    replaceAlignment(xmlData: string, alignment: string): string {
        // left, center, right, both
        return xmlData.replace(/<w:pPr>([\s\S]*?)<\/w:pPr>/g, (match, content) => {
            if (/w:jc w:val="[^"]*"/.test(content)) {
                return match.replace(/w:jc w:val="[^"]*"/g, `w:jc w:val="${alignment}"`);
            } else {
                return match.replace('</w:pPr>', `<w:jc w:val="${alignment}"/></w:pPr>`);
            }
        });
    }

    //отступы в макете
    replaceIndentation(
        xmlData: string,
        left: string = "0",
        right: string = "0",
        firstLine: string = "709"
    ): string {
        return xmlData.replace(/<w:pPr>([\s\S]*?)<\/w:pPr>/g, (match, content) => {
            // Проверяем, существует ли <w:ind> внутри <w:pPr>
            if (/<w:ind[^>]*>/.test(content)) {
                // Если <w:ind> существует, обновляем или добавляем нужные атрибуты
                return match.replace(/<w:ind[^>]*>/, (indTag) => {
                    let updatedInd = indTag;
    
                    // Заменяем или добавляем атрибуты
                    updatedInd = updatedInd.replace(/w:left="[^"]*"/, `w:left="${left}"`);
                    updatedInd = updatedInd.replace(/w:right="[^"]*"/, `w:right="${right}"`);
                    updatedInd = updatedInd.replace(/w:firstLine="[^"]*"/, `w:firstLine="${firstLine}"`);
                    
                    // Если атрибут отсутствует, добавляем его
                    if (!/w:left="[^"]*"/.test(updatedInd)) {
                        updatedInd = updatedInd.replace('<w:ind', `<w:ind w:left="${left}"`);
                    }
                    if (!/w:right="[^"]*"/.test(updatedInd)) {
                        updatedInd = updatedInd.replace('<w:ind', `<w:ind w:right="${right}"`);
                    }
                    if (!/w:firstLine="[^"]*"/.test(updatedInd)) {
                        updatedInd = updatedInd.replace('<w:ind', `<w:ind w:firstLine="${firstLine}"`);
                    }
    
                    // Убираем атрибут w:hanging, если он есть
                    updatedInd = updatedInd.replace(/w:hanging="[^"]*"/, '');
    
                    return updatedInd;
                });
            } else {
                // Если <w:ind> отсутствует, добавляем его
                return match.replace(
                    '</w:pPr>',
                    `<w:ind w:left="${left}" w:right="${right}" w:firstLine="${firstLine}"/></w:pPr>`
                );
            }
        });
    }    

    isEmptyOrWhitespace(paragraph: string): boolean {
        // Удаляем XML-теги, если строка является частью XML
        const plainText = paragraph.replace(/<[^>]*>/g, '').trim();
    
        // Проверяем, содержит ли строка только пробелы или пустая
        return plainText.length === 0;
    }

    addEmptyParagraph(paragraphs: string[], textId: string, rsid: string, index: number, fontSize: string = "24"): string[] {
        // Генерация уникальных ID
        const paraId = Math.random().toString(36).substr(2, 8).toUpperCase();

        // Генерация пустого абзаца
        const emptyParagraph = `
            <w:p w14:paraId="${paraId}" w14:textId="${textId}" w:rsidR="${rsid}" w:rsidRPr="${rsid}" w:rsidRDefault="${rsid}" w:rsidP="${rsid}">
                <w:pPr>
                    <w:spacing w:line="360" />
                    <w:rPr>
                        <w:sz w:val="${fontSize}"/>
                        <w:szCs w:val="${fontSize}"/>
                        <w:spacing w:val="1"/>
                    </w:rPr>
                    <w:jc w:val="left"/>
                </w:pPr>
        `;

        // Вставляем пустой абзац в нужное место
        paragraphs.splice(index, 0, emptyParagraph);

        return paragraphs;
    }

    addTextParagraph(paragraphs: string[], textId: string, rsid: string, index: number, fontSize: string = "24", text: string): string[] {
        const paraId = Math.random().toString(36).substr(2, 8).toUpperCase();

        // Генерация абзаца
        const textParagraph = `
            <w:p w14:paraId="${paraId}" w14:textId="${textId}" w:rsidR="${rsid}" w:rsidRPr="${rsid}" w:rsidRDefault="${rsid}" w:rsidP="${rsid}">
                <w:pPr>
                    <w:spacing w:line="360" />
                    <w:rPr>
                        <w:sz w:val="${fontSize}"/>
                        <w:szCs w:val="${fontSize}"/>
                        <w:spacing w:val="1"/>
                    </w:rPr>
                    <w:jc w:val="left"/>
                </w:pPr>
                <w:r w:rsidRPr="${rsid}">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:color w:val="000000" w:themeColor="text1"/>
                        <w:sz w:val="28"/>
                        <w:szCs w:val="28"/>
                        <w:u w:val="none"/>
                        <w:spacing w:val="0"/>
                    </w:rPr>
                    <w:t xml:space="preserve">${text} </w:t>
                </w:r>
        `;

        // Вставляем абзац в нужное место
        paragraphs.splice(index, 0, textParagraph);

        return paragraphs;
    }

    getRsidFromParagraph(paragraph: string): string | null {
        const rsidMatch = paragraph.match(/w:rsidR="([^"]+)"/);
        return rsidMatch ? rsidMatch[1] : null;
    }

    getTextIdFromParagraph(paragraph: string): string | null {
        const textIdMatch = paragraph.match(/w14:textId="([^"]+)"/);
        return textIdMatch ? textIdMatch[1] : null;
    }

    removeTextHighlighting(xmlData: string): string {
        return xmlData.replace(/<w:highlight[^>]*\/>/g, '');
    } 
    
    mergeTextBlocks(paragraphs: string[], keyword: string, startIndex: number): string {
        // let matchedBlocks = [];
        // for (let i = startIndex; i < paragraphs.length; i++) {
        //     const paragraph = paragraphs[i];
    
        //     // Найти все совпадения текста внутри <w:t>
        //     const regex = new RegExp(`<w:t[^>]*>(.*?)<\/w:t>`, 'g');
        //     const matches = [...paragraph.matchAll(regex)].map(match => match[1]);
    
        //     // Найти текст, совпадающий с текущим keyword
        //     let foundIndex = -1;
            
        //     for (let j = 0; j < matches.length; j++) {
        //         matchedBlocks.push(matches[j]);
        //         if (matchedBlocks.join(' ') === keyword) {
        //             foundIndex = j - matchedBlocks.length + 1;
        //             break;
        //         }
        //     }

        //     if (i > startIndex) {
        //         paragraphs[i] = ''; // Полностью удаляем элемент массива
        //     }            
    
        //     // Если совпадений нет или текст уже цельный, перейти к следующему параграфу
        //     const normalizedMatchedBlocks = matchedBlocks.map(block => block.trim()).join(' ').replace(/\s+/g, ' ');
        //     if (normalizedMatchedBlocks !== keyword) {
        //         continue;
        //     }
    
        //     // Скомбинировать текст из всех блоков
        //     const combinedText = matchedBlocks.join(' ');
        //     const startMatch = paragraphs[startIndex].match(/<w:t[^>]*>(.*?)<\/w:t>/);
        //     paragraphs[startIndex] = paragraphs[startIndex].replace(startMatch[0],  `<w:t>` + combinedText + `</w:t>`);
    
        //     return paragraphs[i] = paragraphs[i].replace(matches[foundIndex], combinedText);
        // }
        return 'bebra';
    }
    
    
}


    // // Основной метод для сравнения и исправления документа по шаблону
    // async fixDocumentWithTemplate(templateBuffer: Buffer, documentBuffer: Buffer, exclusions: string[] = []): Promise<Buffer> {
    //     // Сохраняем файлы временно для распаковки
    //     const tempTemplatePath = './template.docx';
    //     const tempDocumentPath = './document.docx';
    //     const fixedDocumentPath = './fixed_document.docx'; // Путь для сохранения исправленного файла

    //     fs.writeFileSync(tempTemplatePath, templateBuffer);
    //     fs.writeFileSync(tempDocumentPath, documentBuffer);

    //     // Чтение шаблона
    //     const templateContent = await this.unzipDocx(tempTemplatePath);
    //     const parsedTemplate = await this.parseXml(templateContent);

    //     // Чтение документа
    //     const documentContent = await this.unzipDocx(tempDocumentPath);
    //     const parsedDocument = await this.parseXml(documentContent);

    //     // Исправляем документ в соответствии с шаблоном
    //     const fixedDocument = this.deepFix(parsedDocument, parsedTemplate, '', exclusions);

    //     // Преобразуем исправленный документ обратно в XML
    //     const builder = new xml2js.Builder();
    //     const fixedXml = builder.buildObject(fixedDocument);

    //     // Запись исправленного XML обратно в .docx
    //     const fixedBuffer = await this.writeFixedDocx(fixedXml, tempDocumentPath);

    //     // Сохранение исправленного файла на диск
    //     fs.writeFileSync(fixedDocumentPath, fixedBuffer);  // Сохраняем исправленный файл

    //     // Удаляем временные файлы
    //     fs.unlinkSync(tempTemplatePath);
    //     fs.unlinkSync(tempDocumentPath);

    //     // Возвращаем исправленный файл как Buffer (если нужно для других целей)
    //     return fixedBuffer;
    // }


    // // Метод для распаковки и чтения содержимого docx
    // private async unzipDocx(filePath: string): Promise<string> {
    //     const directory = await unzipper.Open.file(filePath);
    //     const documentFile = directory.files.find(d => d.path === 'word/document.xml');
    //     const content = await documentFile.buffer();
    //     return content.toString();
    // }

    // // Парсинг XML содержимого
    // private async parseXml(xmlContent: string): Promise<any> {
    //     const parser = new xml2js.Parser();
    //     const result = await parser.parseStringPromise(xmlContent);
    //     return result;
    // }

    // // Запись исправленного .docx файла с помощью JSZip
    // private async writeFixedDocx(fixedXml: string, originalDocxPath: string): Promise<Buffer> {
    //     // Чтение оригинального документа для сохранения всех файлов
    //     const originalZip = await JSZip.loadAsync(fs.readFileSync(originalDocxPath));

    //     // Заменяем содержимое 'word/document.xml' на исправленное
    //     originalZip.file('word/document.xml', fixedXml);

    //     // Генерация исправленного .docx файла в виде Buffer
    //     const fixedBuffer = await originalZip.generateAsync({ type: 'nodebuffer' });

    //     return fixedBuffer;
    // }

    // // Метод для рекурсивного исправления несоответствий
    // deepFix(obj1: any, obj2: any, path: string = '', exclusions: string[] = []): any {
    //     // Если оба объекта являются массивами или объектами
    //     if (typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null) {
    //         const result: any = Array.isArray(obj1) ? [] : {};
    //         const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    
    //         keys.forEach(key => {
    //             const newPath = path ? `${path}.${key}` : key;
    
    //             // Пропускаем исключения
    //             if (exclusions.includes(newPath)) {
    //                 result[key] = obj1[key];
    //                 return;
    //             }
    
    //             // Если элемент отсутствует в загруженном документе, берем его из шаблона
    //             if (!(key in obj1)) {
    //                 result[key] = obj2[key];
    //             } 
    //             // Если элемент отсутствует в шаблоне, оставляем как есть
    //             else if (!(key in obj2)) {
    //                 result[key] = obj1[key];
    //             } 
    //             // Если оба элемента присутствуют, рекурсивно исправляем вложенные объекты
    //             else {
    //                 result[key] = this.deepFix(obj1[key], obj2[key], newPath, exclusions);
    //             }
    //         });
    
    //         return result;
    //     }
    
    //     // Если значения разные, берем значение из шаблона (в том числе стили)
    //     if (obj1 !== obj2) {
    //         return obj2;
    //     }
    
    //     return obj1;
    // }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // async analyzeDocx(fileBuffer: Buffer): Promise<any> {
    //     // Сохраняем файл временно для распаковки
    //     const tempFilePath = './temp.docx';
    //     fs.writeFileSync(tempFilePath, fileBuffer);

    //     // Извлекаем стили по умолчанию из styles.xml
    //     const defaultStyles = await this.getDefaultStyles(tempFilePath);
    //     const defaultFont = await this.getDefaultFont(defaultStyles);

    //     // Распаковываем и читаем содержимое документа
    //     const docxContent = await this.unzipDocx(tempFilePath);
    //     const parsedContent = await this.parseXml(docxContent);

    //     // Пример: проверка на наличие каких-либо элементов
    //     // Передача абзацев и свойств секции
    //     const issues = this.checkFormattingForAllLines(
    //         parsedContent['w:document']['w:body'][0]['w:p'],        // Абзацы
    //         defaultFont,                                            // Шрифт по умолчанию
    //         parsedContent['w:document']['w:body'][0]['w:sectPr'],   // Свойства секции (поля)
    //         parsedContent['w:document']['w:body'][0]['w:p']     
    //     );

    //     console.log('Parsed content:', JSON.stringify(parsedContent, null, 2));

    //     // Удаляем временный файл после обработки
    //     fs.unlinkSync(tempFilePath);

    //     return issues;
    // }

    // private async unzipDocx(filePath: string): Promise<string> {
    //     const directory = await unzipper.Open.file(filePath);
    //     const documentFile = directory.files.find(d => d.path === 'word/document.xml');
    //     const content = await documentFile.buffer();
    //     return content.toString();
    // }

    // private async parseXml(xmlContent: string): Promise<any> {
    //     const parser = new xml2js.Parser();
    //     const result = await parser.parseStringPromise(xmlContent);
    //     return result;
    // }

    // // Извлечение стилей из styles.xml
    // private async getDefaultStyles(filePath: string): Promise<any> {
    //     const directory = await unzipper.Open.file(filePath);
    //     const stylesFile = directory.files.find(d => d.path === 'word/styles.xml');
    //     if (stylesFile) {
    //         const content = await stylesFile.buffer();
    //         const parser = new xml2js.Parser();
    //         const result = await parser.parseStringPromise(content.toString());
    //         return result;
    //     }
    //     return null;
    // }

    // // Получение шрифта по умолчанию из стилей
    // private async getDefaultFont(styles: any): Promise<string> {
    //     const defaultStyle = styles?.['w:styles']?.['w:docDefaults']?.[0]['w:rPrDefault']?.[0]['w:rPr']?.[0]['w:rFonts']?.[0]['$'];
    //     return defaultStyle?.['w:ascii'] || 'Times New Roman'; // Возвращаем шрифт по умолчанию
    // }

    // private rules = {
    //     titlePageLines: [
    //         {
    //             alignment: 'center',
    //             fontSize: 11.5,
    //             bold: false,
    //             lineSpacing: 'single',
    //             indent: 0,
    //             font: 'Times New Roman',
    //             startsWithCapital: true,
    //             endsWithoutPeriod: true,
    //             allCaps: true
    //         },
    //         // Добавить правила для остальных строк...
    //     ]
    // };

    // private checkFormattingForAllLines(paragraphs: any[], defaultFont: string, sectionProperties: any, lineProp: any): string[] {
    //     const issues: string[] = [];
        
    //     paragraphs.forEach((paragraph, index) => {
    //         const rulesForLine = this.rules.titlePageLines[index];  // Правила для каждой строки
    //         if (rulesForLine) {
    //             issues.push(...this.checkLineFormatting(paragraph, rulesForLine, defaultFont));
    //         }
    //     });
    
    //     // Проверка отступов секции
    //     issues.push(...this.checkSectionProperties(sectionProperties, lineProp));
        
    //     return issues;
    // }
    
    // private checkSectionProperties(sectionProperties: any, lineProp: any): string[] {
    //     const issues: string[] = [];
    //     const pageMargins = sectionProperties?.[0]['w:pgMar']?.[0]?.['$'];

    //     issues.push(...this.checkMargins(sectionProperties));
    
    //     // Проверка отступов страницы
    //     if (pageMargins) {
    //         if (pageMargins['w:left'] !== '1701') {
    //             issues.push('Левый отступ страницы должен быть 3 см');
    //         }
    //         if (pageMargins['w:right'] !== '850') {
    //             issues.push('Правый отступ страницы должен быть 1 см');
    //         }
    //     }
    
    //     // Проверка междустрочного интервала (учитывая w:docGrid)
    //     const linePitch = lineProp?.[0]['w:pPr'][0]['w:rPr'][0]['w:spacing'][0]?.['$']['w:val'];
    //     if (linePitch && linePitch !== '0') {
    //         issues.push('Междустрочный интервал должен быть одинарным (0)');
    //     }
    
    //     return issues;
    // }
    
    

    // private checkLineFormatting(paragraph: any, rules: any, defaultFont: string): string[] {
    //     const issues: string[] = [];

    //     // Проверка выравнивания
    //     const alignment = paragraph['w:pPr']?.[0]['w:jc']?.[0]['$']?.['w:val'];
    //     if (alignment !== rules.alignment) {
    //         issues.push('Неправильное выравнивание');
    //     }

    //     // Проверка размера шрифта
    //     const fontSize = paragraph['w:r']?.[0]['w:rPr']?.[0]['w:sz']?.[0]['$']?.['w:val'];
    //     if (fontSize !== String(rules.fontSize * 2)) { 
    //         issues.push(`Размер шрифта должен быть ${rules.fontSize}`);
    //     }

    //     // Проверка жирности шрифта
    //     const bold = !!paragraph['w:r']?.[0]['w:rPr']?.[0]['w:b'];
    //     if (bold !== rules.bold) {
    //         issues.push(`Требуемая жирность шрифта: ${rules.bold ? 'жирный' : 'не жирный'}`);
    //     }

    //     // Проверка шрифта (Times New Roman или шрифт по умолчанию)
    //     const font = paragraph['w:r']?.[0]['w:rPr']?.[0]['w:rFonts']?.[0]['$']?.['w:ascii'] || defaultFont;
    //     if (font !== rules.font) {
    //         issues.push(`Шрифт должен быть ${rules.font}`);
    //     }

    //     // Проверка отступов
    //     const indentLeft = paragraph['w:pPr']?.[0]['w:ind']?.[0]['$']?.['w:left'];
    //     const indentRight = paragraph['w:pPr']?.[0]['w:ind']?.[0]['$']?.['w:right'];
    //     if (indentLeft !== '0' || indentRight !== '0') {
    //         issues.push('Отступы строки должны быть равны 0');
    //     }

    //     // Проверка того, что строка начинается с заглавной буквы
    //     const text = paragraph['w:r']?.[0]['w:t']?.[0];
    //     if (text && rules.startsWithCapital && text[0] !== text[0].toUpperCase()) {
    //         issues.push('Строка должна начинаться с заглавной буквы');
    //     }

    //     // Проверка того, что строка не заканчивается точкой
    //     if (text && rules.endsWithoutPeriod && text.endsWith('.')) {
    //         issues.push('Строка не должна заканчиваться точкой');
    //     }

    //     return issues;
    // }

    // // Пример проверки полей титульного листа
    // private checkMargins(margins: any): string[] {
    //     const issues: string[] = [];
    
    //     // Проверка существования объекта с полями
    //     const pageMargins = margins?.[0]['w:pgMar']?.[0]?.['$'];
    //     console.log(pageMargins);
    
    //     if (!pageMargins) {
    //         issues.push('Поля страницы не заданы');
    //         return issues;
    //     }
    
    //     // Проверка верхнего поля
    //     if (pageMargins['w:top'] !== '1134') {
    //         issues.push('Верхнее поле должно быть 2 см');
    //     }
        
    //     // Проверка нижнего поля
    //     if (pageMargins['w:bottom'] !== '1134') {
    //         issues.push('Нижнее поле должно быть 2 см');
    //     }
        
    //     // Проверка левого поля
    //     if (pageMargins['w:left'] !== '1701') {
    //         issues.push('Левое поле должно быть 3 см');
    //     }
    
    //     // Проверка правого поля
    //     if (pageMargins['w:right'] !== '850') {
    //         issues.push('Правое поле должно быть 1 см');
    //     }
    
    //     return issues;
    // }
    
    
// }
