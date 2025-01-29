import { Controller, Post, UploadedFile, UseInterceptors, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { OpenDocx } from "./open-docx.service";

@Controller("file-checker")
export class FileCheckerController {
    constructor(private readonly openDocxService: OpenDocx) {}

    @Post("convert")
    @UseInterceptors(FileInterceptor("document"))
    async convertToTimesNewRoman(
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        // Преобразуем файл в шрифт Times New Roman
        const updatedFileBuffer = await this.openDocxService.openDocx(file.buffer);

        // Отправляем результат в ответ
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-Disposition": `attachment; filename=output.docx`,
        });

        res.send(updatedFileBuffer);
    }
}



// import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
// import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
// import { FileCheckerService } from './file-checker.service';

// @Controller('file-checker')
// export class FileCheckerController {
//     constructor(private readonly fileCheckerService: FileCheckerService) {}

//     // @Post('analyze')
//     // @UseInterceptors(FileInterceptor('test.docx'))
//     // async analyzeDocx(@UploadedFile() file: Express.Multer.File) {
//     //     const issues = await this.fileCheckerService.analyzeDocx(file.buffer);
//     //     return { issues };
//     // }

//     @Post('compare')
//     @UseInterceptors(FileFieldsInterceptor([
//         { name: 'template', maxCount: 1 },
//         { name: 'document', maxCount: 1 }
//     ]))
//     async compareFiles(@UploadedFiles() files: { template?: Express.Multer.File[], document?: Express.Multer.File[] }) {
//         // Логируем содержимое files для отладки
//         console.log('Received files:', files);

//         if (!files) {
//             return { error: 'Both template and document files are required.' };
//         }

//         const templateBuffer = files.template[0].buffer;
//         const documentBuffer = files.document[0].buffer;

//         // Сравниваем шаблон с документом
//         const issues = await this.fileCheckerService.fixDocumentWithTemplate(templateBuffer, documentBuffer);
//         return { issues };
//     }
// }
