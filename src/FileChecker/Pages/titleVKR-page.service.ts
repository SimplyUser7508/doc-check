import { Injectable } from '@nestjs/common';
import { FileCheckerService } from '../file-checker.service';

@Injectable()
export class TitleVkrPage {
    constructor(private readonly fileChecker: FileCheckerService) { }

    titleVkrPage(xmlData: string): string {
        const paragraphs = xmlData.split(/<\/w:p>/g);

        const titleIndex = paragraphs.findIndex(p =>
            /<w:t[^>]*>[^<]*выпускная[^<]*<\/w:t>/i.test(p)
        );

        console.log("titleIndex", titleIndex);

        const selfIndex = paragraphs.findIndex(p =>
            /<w:t[^>]*>[^<]*работу[^<]*<\/w:t>/i.test(p)
        );

        console.log("selfIndex", selfIndex);

        const normcontrollIndex = paragraphs.findIndex(p =>
            /<w:t[^>]*>[^<]*нормоконтролер[^<]*<\/w:t>/i.test(p)
        );
        
        console.log("normcontrollIndex", normcontrollIndex);

        paragraphs[0] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[0], "23"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "240"
        );
        paragraphs[1] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[1], "24"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "240"
        );
        paragraphs[2] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[2], "24"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "240"
        );
        paragraphs[3] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[3], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "709"
            ),
            "276"
        );
        paragraphs[4] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[4], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "709"
            ),
            "276"
        );
        paragraphs[5] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[5], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "709"
            ),
            "276"
        );
        paragraphs[6] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
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
                "0", "0", "709"
            ),
            "276"
        );
        for (let i = 7; i <= 14; i++) {
            if (i === 10) {
                paragraphs[10] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.removeBold(
                                this.fileChecker.removeItalics(
                                    this.fileChecker.replaceColor(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[10], "28"),
                                            "1")
                                    )
                                )
                            ),
                            "both"
                        ),
                        "6095", "0", "0"
                    ),
                    "240"
                );
            };
            if (i === 11) {
                paragraphs[11] = this.fileChecker.replaceLineSpacing(
                    this.fileChecker.replaceIndentation(
                        this.fileChecker.replaceAlignment(
                            this.fileChecker.removeBold(
                                this.fileChecker.removeItalics(
                                    this.fileChecker.replaceColor(
                                        this.fileChecker.replaceLetterSpacing(
                                            this.fileChecker.replaceFontSize(paragraphs[11], "16"),
                                            "1")
                                    )
                                )
                            ),
                            "left"
                        ),
                        "5103", "0", "992"
                    ),
                    "240"
                );
            };
            paragraphs[i] = this.fileChecker.replaceLineSpacing(
                this.fileChecker.replaceIndentation(
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
                        "both"
                    ),
                    "5103", "0", "992"
                ),
                "240"
            );
        }
        // paragraphs[15] = this.fileChecker.replaceLineSpacing(
        //     this.fileChecker.replaceIndentation(
        //         this.fileChecker.replaceAlignment(
        //             this.fileChecker.removeBold(
        //                 this.fileChecker.removeItalics(
        //                     this.fileChecker.replaceColor(
        //                         this.fileChecker.replaceLetterSpacing(
        //                             this.fileChecker.replaceFontSize(paragraphs[15], "24"),
        //                             "1")
        //                     )
        //                 )
        //             ),
        //             "both"
        //         ),
        //         "5103", "0", "992"
        //     ),
        //     "240"
        // );
        // paragraphs[16] = this.fileChecker.replaceLineSpacing(
        //     this.fileChecker.replaceIndentation(
        //         this.fileChecker.replaceAlignment(
        //             this.fileChecker.removeBold(
        //                 this.fileChecker.removeItalics(
        //                     this.fileChecker.replaceColor(
        //                         this.fileChecker.replaceLetterSpacing(
        //                             this.fileChecker.replaceFontSize(paragraphs[16], "24"),
        //                             "1")
        //                     )
        //                 )
        //             ),
        //             "both"
        //         ),
        //         "0", "0", "0"
        //     ),
        //     "276"
        // );
        // paragraphs[17] = this.fileChecker.replaceLineSpacing(
        //     this.fileChecker.replaceIndentation(
        //         this.fileChecker.replaceAlignment(
        //             this.fileChecker.removeBold(
        //                 this.fileChecker.removeItalics(
        //                     this.fileChecker.replaceColor(
        //                         this.fileChecker.replaceLetterSpacing(
        //                             this.fileChecker.replaceFontSize(paragraphs[17], "24"),
        //                             "1")
        //                     )
        //                 )
        //             ),
        //             "both"
        //         ),
        //         "0", "0", "0"
        //     ),
        //     "276"
        // );
        // paragraphs[18] = this.fileChecker.replaceLineSpacing(
        //     this.fileChecker.replaceIndentation(
        //         this.fileChecker.replaceAlignment(
        //             this.fileChecker.removeBold(
        //                 this.fileChecker.removeItalics(
        //                     this.fileChecker.replaceColor(
        //                         this.fileChecker.replaceLetterSpacing(
        //                             this.fileChecker.replaceFontSize(paragraphs[18], "24"),
        //                             "1")
        //                     )
        //                 )
        //             ),
        //             "both"
        //         ),
        //         "0", "0", "0"
        //     ),
        //     "276"
        // );
        paragraphs[titleIndex] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[titleIndex], "28"),
                                    "50")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "276"
        );
        paragraphs[titleIndex + 1] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[titleIndex + 1], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "276"
        );
        paragraphs[titleIndex + 2] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[titleIndex + 2], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "276"
        );
        paragraphs[titleIndex + 3] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[titleIndex + 3], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "276"
        );
        paragraphs[titleIndex + 4] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.makeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[titleIndex + 4], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "276"
        );
        paragraphs[titleIndex + 5] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[titleIndex + 5], "28"),
                                    "1")
                            )
                        )
                    ),
                    "center"
                ),
                "0", "0", "0"
            ),
            "276"
        );
        for (let i = selfIndex; i <= selfIndex + 4; i++) {
            paragraphs[i] = this.fileChecker.replaceLineSpacing(
                this.fileChecker.replaceIndentation(
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
                        "both"
                    ),
                    "0", "0", "0"
                ),
                "360"
            );
        }
        paragraphs[normcontrollIndex] = this.fileChecker.replaceLineSpacing(
            this.fileChecker.replaceIndentation(
                this.fileChecker.replaceAlignment(
                    this.fileChecker.removeBold(
                        this.fileChecker.removeItalics(
                            this.fileChecker.replaceColor(
                                this.fileChecker.replaceLetterSpacing(
                                    this.fileChecker.replaceFontSize(paragraphs[normcontrollIndex], "28"),
                                    "0")
                            )
                        )
                    ),
                    "left"
                ),
                "0", "0", "0"
            ),
            "360"
        );
        for (let i = normcontrollIndex + 1; i <= normcontrollIndex + 3; i++) {
            paragraphs[i] = this.fileChecker.replaceLineSpacing(
                this.fileChecker.replaceIndentation(
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
                ),
                "360"
            );
        }

        // Объединяем абзацы обратно
        return paragraphs.join('</w:p>');
    }
}