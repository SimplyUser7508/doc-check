import { Injectable } from '@nestjs/common';
import { FileCheckerService } from '../file-checker.service';

@Injectable()
export class TitleVkrPage {
    constructor(private readonly fileChecker: FileCheckerService) { }

    titleVkrPage(xmlData: string): string {
        const paragraphs = xmlData.split(/<\/w:p>/g);

        paragraphs[0] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[0], "23"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[1] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[1], "24"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[2] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[2], "24"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[3] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[3], "28"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[4] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[4], "28"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[5] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[5], "28"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[6] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[6], "28"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[7] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeItalics(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[7], "16"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[8] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[8], "28"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[9] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[9], "16"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[10] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[10], "16"),
                        "0")
                )
            )
        );
        for (let i = 11; i <= 13; i++) {
            paragraphs[i] = this.fileChecker.replaceIndentation(
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
                "5103", "0", "992"
            );
        }
        paragraphs[14] = this.fileChecker.replaceIndentation(
            this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[14], "16"),
                                "0"),
                            "left"
                        )
                    )
                )
            ),
            "5103", "0", "992"
        );
        paragraphs[15] = this.fileChecker.replaceIndentation(
            this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[15], "28"),
                                "0"),
                            "left"
                        )
                    )
                )
            ),
            "5103", "0", "992"
        );
        paragraphs[16] = this.fileChecker.replaceIndentation(
            this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[16], "16"),
                                "0"),
                            "left"
                        )
                    )
                )
            ),
            "5103", "0", "992"
        );
        paragraphs[17] = this.fileChecker.replaceIndentation(
            this.fileChecker.removeBold(
                this.fileChecker.removeItalics(
                    this.fileChecker.replaceColor(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[17], "28"),
                                "0"),
                            "left"
                        )
                    )
                )
            ),
            "5103", "0", "992"
        );
        paragraphs[18] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[18], "28"),
                        "0")
                )
            )
        );
        paragraphs[19] = this.fileChecker.removeBold(
            this.fileChecker.removeItalics(
                this.fileChecker.replaceColor(
                    this.fileChecker.replaceLetterSpacing(
                        this.fileChecker.replaceFontSize(paragraphs[19], "28"),
                        "0")
                )
            )
        );
        paragraphs[20] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[20], "28"),
                                "40")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[21] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[21], "28"),
                                "40")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[22] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[22], "28"),
                                "0")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[23] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[23], "30"),
                                "1")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        paragraphs[24] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.makeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[24], "30"),
                                "1")
                        )
                    )
                ),
                "center"
            ),
            "0", "0", "0"
        );
        for (let i = 25; i <= 34; i++) {
            paragraphs[i] = this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                    "1")
                            )
                        )
                    ),
                    "left"
                ),
                "0", "0", "0"
            );
        }
        paragraphs[35] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[35], "28"),
                                "0")
                        )
                    )
                ),
                "left"
            ),
            "0", "0", "0"
        );
        paragraphs[36] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[36], "16"),
                                "1")
                        )
                    )
                ),
                "left"
            ),
            "0", "0", "0"
        );
        paragraphs[37] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[37], "28"),
                                "1")
                        )
                    )
                ),
                "left"
            ),
            "0", "0", "0"
        );
        paragraphs[38] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[38], "28"),
                                "1")
                        )
                    )
                ),
                "left"
            ),
            "0", "0", "0"
        );
        paragraphs[39] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[39], "16"),
                                "1")
                        )
                    )
                ),
                "left"
            ),
            "0", "0", "0"
        );
        paragraphs[40] = this.fileChecker.replaceIndentation(
            this.fileChecker.replaceAlignment(
                this.fileChecker.removeBold(
                    this.fileChecker.removeItalics(
                        this.fileChecker.replaceColor(
                            this.fileChecker.replaceLetterSpacing(
                                this.fileChecker.replaceFontSize(paragraphs[40], "28"),
                                "1")
                        )
                    )
                ),
                "left"
            ),
            "0", "0", "0"
        );
        for (let i = 41; i <= 44; i++) {
            paragraphs[i] = this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[i], "28"),
                                    "0")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            );
        }

        // Объединяем абзацы обратно
        return paragraphs.join('</w:p>');
    }
}