import { Injectable } from '@nestjs/common';
import { FileCheckerService } from '../file-checker.service';

@Injectable()
export class TitlePage {
    constructor(private readonly fileChecker: FileCheckerService) {}

    titlePage(xmlData: string): string {
        const paragraphs = xmlData.split(/<\/w:p>/g);
        
        paragraphs[0] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[0], "23"), 
                    "0")
                )
            )
        );
        paragraphs[1] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[1], "24"), 
                    "0")
                )
            )
        );
        paragraphs[2] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[2], "24"), 
                    "0")
                )
            )
        );
        paragraphs[3] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[3], "28"), 
                    "0")
                )
            )
        );
        paragraphs[4] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[4], "28"), 
                    "0")
                )
            )
        );
        paragraphs[5] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[5], "28"), 
                    "0")
                )
            )
        );
        paragraphs[6] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[6], "28"), 
                    "0")
                )
            )
        );
        paragraphs[7] = this.fileChecker.removeItalics(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[7], "20"), 
                    "0")
                )
            )
        );
        paragraphs[8] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[8], "28"), 
                    "0")
                )
            )
        );
        for (let i = 9; i <= 14; i++) {
            paragraphs[i] = this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceLetterSpacing(
                            this.fileChecker.replaceFontSize(paragraphs[i], "28"), 
                        "0")
                    )
                )
            );
        }
        paragraphs[15] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[15], "28"), 
                    "70")
                )
            )
        );
        paragraphs[16] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[16], "28"), 
                    "0")
                )
            )
        );
        paragraphs[17] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[17], "30"), 
                    "0")
                )
            )
        );
        paragraphs[18] = this.fileChecker.makeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[18], "30"), 
                    "0")
                )
            )
        );
        for (let i = 19; i <= 41; i++) {
            paragraphs[i] = this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceLetterSpacing(
                            this.fileChecker.replaceFontSize(paragraphs[i], "28"), 
                        "0")
                    )
                )
            );
        }
        paragraphs[27] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[27], "20"), 
                    "0")
                )
            )
        );
        paragraphs[29] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[29], "20"), 
                    "0")
                )
            )
        );
        paragraphs[32] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[32], "20"), 
                    "0")
                )
            )
        );

        // Объединяем абзацы обратно
        return paragraphs.join('</w:p>');
    }
}