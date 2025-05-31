import { Injectable } from '@nestjs/common';
import { FileCheckerService } from '../file-checker.service';

export const extractedTexts: string[] = [];

@Injectable()
export class ThesisContentPage {
    constructor(private readonly fileChecker: FileCheckerService) { }

    extractedText = (inputString) => {
        const textInsideWTagRegex = /<w:t[^>]*>([^<]*)/g;
      
        const matches = [...inputString.matchAll(textInsideWTagRegex)];
      
        return matches.map(match => match[1].trim()).filter(text => text !== '');
    };

    introductionPage(xmlData: string): string {
        const paragraphs = xmlData.split(/<\/w:p>/g);
        let startIndex = 0;
        const keywords = [
            "приложение", 
            "перечень сокращений и обозначений", 
            "введение", 
            "заключение", 
            "список использованных источников"
        ];
        let ind = 199;

        const thesisContentIndex = paragraphs.findIndex(p =>
            p.toLowerCase().includes('содержание')
        );

        // const introductionIndex = paragraphs.findIndex(p =>
        //     /<w:t>\s*введение\s*<\/w:t>/i.test(p)
        // );
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
          
        const notationsListIndex = paragraphs.findIndex(p =>
            /<w:t>\s*перечень сокращений и обозначений\s*<\/w:t>/i.test(p)
        );

        if (notationsListIndex > 0 && introductionIndex > 0) {
            startIndex = Math.min(notationsListIndex, introductionIndex);
        } else {
            startIndex = Math.max(notationsListIndex, introductionIndex);
        }

        // console.log(thesisContentIndex, introductionIndex);
        // console.log(paragraphs[introductionIndex]);

        if (thesisContentIndex !== -1) {
            paragraphs[thesisContentIndex] = paragraphs[thesisContentIndex]
            .replace(/содержание/gi, match => match.toUpperCase());
        }

        if (introductionIndex !== -1) {
            paragraphs[introductionIndex] = paragraphs[introductionIndex]
            .replace(/введение/gi, match => match.toUpperCase());
        }

        paragraphs[thesisContentIndex] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceAlignment(
                        this.fileChecker.replaceLetterSpacing(
                            this.fileChecker.replaceFontSize(paragraphs[thesisContentIndex], "32"),
                            "0"),
                        "center"
                    )
                )
            )
        );
        for (let i = thesisContentIndex + 2; i < startIndex; i++) {
            if (!paragraphs[i].toLowerCase().includes('</w:hyperlink>')) break;
            const pageNumbersRegex = /^\d{1,2}$/;
            const singleDigitRegex = /\d{1,2}(?!\.\d)\s.+/g;
            const digitWithPointRegex = /\d{1,2}\.\d\s/g;
            const doublePointRegex = /\d{1,2}\.\d\.\d\s/g;
            
            const containsKeyword = keywords.some(keyword => paragraphs[i].toLowerCase().includes(keyword));

            const extractedText = this.extractedText(paragraphs[i]); 
            extractedTexts.push(...extractedText);
            const combinedText = extractedText.join(' ');
            // console.log(extractedText);

            if (doublePointRegex.test(combinedText)) {
                ind = 284;
                paragraphs[i] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.removeBold(
                            this.fileChecker.removeItalics(
                                this.fileChecker.replaceColor(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                            "0"),
                                        "left"
                                    )
                                )
                            )
                        ),
                        `${ind}`, "567", `${ind}`
                    ), "360"
                );
            } else if (digitWithPointRegex.test(combinedText)) {
                ind = 142;
                paragraphs[i] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.removeBold(
                            this.fileChecker.removeItalics(
                                this.fileChecker.replaceColor(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                            "0"),
                                        "left"
                                    )
                                )
                            )
                        ),
                        `${ind}`, "567", `${ind}`
                    ), "360"
                );
            } else if (pageNumbersRegex.test(combinedText)) {
                paragraphs[i] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.removeBold(
                            this.fileChecker.removeItalics(
                                this.fileChecker.replaceColor(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                            "0"),
                                        "left"
                                    )
                                )
                            )
                        ),
                        "0", "567", "0"
                    ), "360"
                );
            } else if (singleDigitRegex.test(combinedText) || containsKeyword) {
                if (!containsKeyword) ind = 142;
                if (paragraphs[i].toLocaleLowerCase().includes("приложение")) ind = 1589;

                paragraphs[i] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.removeBold(
                            this.fileChecker.removeItalics(
                                this.fileChecker.replaceColor(
                                    this.fileChecker.replaceAlignment(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                            "0"),
                                        "left"
                                    )
                                )
                            )
                        ),
                        "0", "567", "0"
                    ), "360"
                );
            } else if (!containsKeyword) {
                paragraphs[i] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.removeBold(
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
                        ),
                        `${ind}`, "0", `0`
                    ), "360"
                );
            }
        }

        return paragraphs.join('</w:p>');
    }
}