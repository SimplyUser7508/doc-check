import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileCheckerModule } from './FileChecker/file-checker.module';

@Module({
  imports: [FileCheckerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
