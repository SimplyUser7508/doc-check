import { Injectable } from '@nestjs/common';
import { FileCheckerService } from './file-checker.service';
import * as PizZip from "pizzip";
import * as Docxtemplater from "docxtemplater";
import * as fs from "fs";
import { TitlePage } from './Pages/title-page.service';
import { TitleVkrPage } from './Pages/titleVKR-page.service';
import { ReferatPage } from './Pages/referat-page.service';
import { ThesisContentPage } from './Pages/tc-page-service';
import { MainPages } from './Pages/main-page.service';


@Injectable()
export class OpenDocx {
    constructor(
        private readonly fileChecker: FileCheckerService,
        // private readonly titlePageData: TitlePage,
        private readonly titleVkrPageData: TitleVkrPage,
        private readonly referatPageData: ReferatPage,
        private readonly tcPageData: ThesisContentPage,
        private readonly mainPageData: MainPages
    ) {}

    async openDocx(fileBuffer: Buffer): Promise<Buffer> {
        // Чтение файла .docx с помощью PizZip
        const zip = new PizZip(fileBuffer);

        // Инициализация Docxtemplater с файлом
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Извлекаем XML-контент документа
        let xmlData = doc.getZip().files["word/document.xml"].asText();

        // Извлекаем файл с отношениями (_rels/document.xml.rels)
        const relsFileContent = zip.files["word/_rels/document.xml.rels"]?.asText();
        if (!relsFileContent) {
            throw new Error("Не найден файл _rels/document.xml.rels");
        }

        // Вызываем функцию countPagesFromFooters из другого файла
        // const pageCount = await this.referatPageData.countPagesFromFooters(relsFileContent, zip);


        // if( pageCount != 2 ) {
        //     console.log(`Добваьте колонтитул с нумерацией страниц!`);
        // }
    
        // xmlData = this.titlePageData.titlePage(xmlData);
        xmlData = this.fileChecker.replacePageMargins(xmlData);
        xmlData = this.referatPageData.referatPage(xmlData);
        xmlData = this.fileChecker.replaceIndentation(xmlData);
        xmlData = this.fileChecker.replaceFont(xmlData);
        xmlData = this.fileChecker.removeUnderline(xmlData);
        xmlData = this.titleVkrPageData.titleVkrPage(xmlData);
        xmlData = this.tcPageData.introductionPage(xmlData);
        xmlData = this.mainPageData.mainPages(xmlData);
        
        // Шаг 4: Сохраняем обновленный XML в документе
        doc.getZip().file("word/document.xml", xmlData);

        // Генерация нового документа в виде Buffer
        const newDocBuffer = doc.getZip().generate({ type: "nodebuffer" });

        // (Опционально) Сохраняем документ на диск
        fs.writeFileSync("output.docx", newDocBuffer);

        return newDocBuffer;
    }

}