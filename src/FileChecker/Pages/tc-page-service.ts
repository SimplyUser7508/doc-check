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

        const introductionIndex = paragraphs.findIndex(p =>
            /<w:t>\s*введение\s*<\/w:t>/i.test(p)
        );
          
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
        for (let i = thesisContentIndex + 1; i < startIndex; i++) {
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
                // console.log(paragraphs[i]);
                // console.log("0");
                ind = 1419;
                paragraphs[i] = this.fileChecker.replaceIndentation(
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
                    "793", "0", "0"
                );
            } else if (digitWithPointRegex.test(combinedText)) {
                // console.log(paragraphs[i]);
                // console.log("1");
                ind = 823;
                paragraphs[i] = this.fileChecker.replaceIndentation(
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
                    "397", "0", "0"
                );
            } else if (pageNumbersRegex.test(combinedText)) {
                // console.log(paragraphs[i]);
                // console.log("2");
                paragraphs[i] = this.fileChecker.replaceIndentation(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceAlignment(
                                    this.fileChecker.replaceLetterSpacing(
                                        this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                        "0"),
                                    "right"
                                )
                            )
                        )
                    ),
                    "0", "0", "0"
                );
            } else if (singleDigitRegex.test(combinedText) || containsKeyword) {
                // console.log(paragraphs[i]);
                // console.log("3");
                if (!containsKeyword) ind = 199;
                if (paragraphs[i].toLocaleLowerCase().includes("приложение")) ind = 1589;

                paragraphs[i] = this.fileChecker.replaceIndentation(
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
                    "0", "0", "0"
                );
            } else if (!containsKeyword) {
                // console.log(paragraphs[i]);
                // console.log("4");
                paragraphs[i] = this.fileChecker.replaceIndentation(
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
                );
            }
        }

        return paragraphs.join('</w:p>');
    }
}