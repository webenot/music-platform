import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { TrackModule } from 'src/track/track.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TrackModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule
      .forRootAsync({
        imports: [ ConfigModule ],
        useFactory: () => ({
          uri: process.env.MONGO_URL,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
      }),
    FileModule,
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
  ],
})
export class AppModule {
}
