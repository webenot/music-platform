import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { CommentSchema, Comment } from 'src/track/schemas/comment.schema';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [ TrackController ],
  providers: [ TrackService, FileService ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Track.name,
        schema: TrackSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
})
export class TrackModule {

}
