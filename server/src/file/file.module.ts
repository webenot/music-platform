import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';

@Module({ providers: [ FileService ] })
export class FileModule {

}
