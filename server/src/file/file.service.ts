import * as path from 'path';
import * as fs from 'fs';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {

  createFile (type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return type + '/' + fileName;

    } catch (e) {
      console.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile (filename: string) {
    const filePath = path.resolve(__dirname, '..', 'static', filename);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, err => {
        if (err) {
          console.error(err);
          throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
    }
  }

}
