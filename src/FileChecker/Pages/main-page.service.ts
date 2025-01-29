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

    mainPages(xmlData: string): string {
        // console.log(this.removeUnnecessaryDots(extractedTexts));
        const paragraphs = xmlData.match(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g) || [];

        const singleDigitRegex = /^\d{1,2}(?!\.\d)\s.+/;

        const digitWithPointRegex = /\d{1,2}\.\d\s/g;
        const wordsNextLineRegex = /(?<=[а-яёa-z])/g;
        const doublePointRegex = /\d{1,2}\.\d\.\d\s/g;
        let currentArrIndex = 0;
        const lastWord: string[] = [];
        // const applicationRegex = /<w:t>ПРИЛОЖЕНИЕ\s[А-Я]<\/w:t>/g;
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
          
        console.log(restoredTexts[0]);

        const introductionIndex = paragraphs.findIndex(p =>
            /<w:t>\s*ВВЕДЕНИЕ\s*<\/w:t>/.test(p)
        );

        let sourcesListIndex = -1;

        for (let i = paragraphs.length - 1; i >= 0; i--) {
            if (paragraphs[i].toLowerCase().includes('список использованных источников')) {
                sourcesListIndex = i;
                break; // Найдено совпадение, выходим из цикла
            }
        }

        console.log(introductionIndex, sourcesListIndex);
        // console.log(paragraphs[introductionIndex]);

        if (sourcesListIndex !== -1) {
            paragraphs[sourcesListIndex] = paragraphs[sourcesListIndex]
                .replace(/список использованных источников/gi, match => match.toUpperCase());
        }

        for (let i = introductionIndex; i < sourcesListIndex; i++) {
            const containsKeyword = keywords.some(keyword => paragraphs[i].toLowerCase().includes(keyword));
            if (containsKeyword) {
                paragraphs[i] = this.fileChecker.replaceIndentation(
                    this.fileChecker.makeBold(
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
                    )
                );
            } else {
                paragraphs[i] = this.fileChecker.replaceIndentation(
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
                );
            }

        }

        let currentAligment = "center";
        let currentFontSize = "30";
        let titleCounter = 0;

        for (let i = introductionIndex - 1; i <= 110; i++) {
            const extractedText = this.extractedText(paragraphs[i]);
            if (extractedText.length == 0) continue;
            if (extractedText[0].toLowerCase() === restoredTexts[titleCounter].toLowerCase()) titleCounter++;
            else if (extractedText[0].toLowerCase() !== restoredTexts[titleCounter].toLowerCase()) {
                titleCounter++;
                this.fileChecker.mergeTextBlocks(paragraphs, restoredTexts[titleCounter - 1], i);
            }
        }

        // for (let i = introductionIndex - 1; i <= sourcesListIndex; i++) {
        //     const extractedText = this.extractedText(paragraphs[i]);
        //     console.log(extractedText);
        //     if (keywords.some(keyword => paragraphs[i].toLowerCase().includes(keyword))) {
        //         paragraphs[i] = paragraphs[i].replace(
        //             new RegExp(`(${keywords.join('|')})`, 'gi'),
        //             match => match.toUpperCase()
        //         );
                
        //         currentAligment = "center";
        //         currentFontSize = "32"; 
        //     } else if (singleDigitRegex.test(extractedText.join(' ').trim())) {
        //         currentAligment = "left"; 
        //         currentFontSize = "32";
        //     } else {
        //         currentAligment = "left";
        //         currentFontSize = "30";
        //     }

        //     if (paragraphs[i].toLowerCase().includes(restoredTexts[currentArrIndex].toLowerCase())) {
        //         // console.log(tcPageData[currentArrIndex]);
        //         let j = 0;
        //         currentArrIndex++;
        //         paragraphs[i] = this.fileChecker.replaceIndentation(
        //             this.fileChecker.makeBold(
        //                 this.fileChecker.removeItalics(
        //                     this.fileChecker.replaceColor(
        //                         this.fileChecker.removeTextHighlighting(
        //                             this.fileChecker.replaceAlignment(
        //                                 this.fileChecker.replaceLetterSpacing(
        //                                     this.fileChecker.replaceFontSize(paragraphs[i], currentFontSize),
        //                                     "0"),
        //                                 currentAligment
        //                             )
        //                         )
        //                     )
        //                 )
        //             )
        //         );
        //         while (!(paragraphs[i].toLowerCase().includes(restoredTexts[currentArrIndex].toLowerCase()))) {
        //             i++;
        //             j++;
        //             paragraphs[i] = this.fileChecker.replaceIndentation(
        //                 this.fileChecker.makeBold(
        //                     this.fileChecker.removeItalics(
        //                         this.fileChecker.replaceColor(
        //                             this.fileChecker.removeTextHighlighting(
        //                                 this.fileChecker.replaceAlignment(
        //                                     this.fileChecker.replaceLetterSpacing(
        //                                         this.fileChecker.replaceFontSize(paragraphs[i], currentFontSize),
        //                                         "0"),
        //                                     currentAligment
        //                                 )
        //                             )
        //                         )
        //                     )
        //                 )
        //             );
        //         }
        //         if (j > 0) i = i - j;
        //         if (paragraphs[i].toLowerCase().includes('заключение')) break
        //     }
        // }

        return paragraphs.join('');
    }
}