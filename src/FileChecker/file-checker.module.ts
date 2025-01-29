import { Module } from '@nestjs/common';
import { FileCheckerService } from './file-checker.service';
import { FileCheckerController } from './file-checker.controller';
import { TitlePage } from './Pages/title-page.service';
import { OpenDocx } from './open-docx.service';
import { TitleVkrPage } from './Pages/titleVKR-page.service';
import { ReferatPage } from './Pages/referat-page.service';
import { ThesisContentPage } from './Pages/tc-page-service';
import { MainPages } from './Pages/main-page.service';

@Module({
  providers: [
    FileCheckerService,
    ThesisContentPage,
    TitleVkrPage,
    ReferatPage,
    MainPages,
    TitlePage,
    OpenDocx
  ],
  controllers: [FileCheckerController],
})
export class FileCheckerModule {}
