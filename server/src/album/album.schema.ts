import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

import { Track } from 'src/track/schemas/track.schema';

export type AlbumDocument = Comment & Document;

@Schema()
export class Album {

  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @Prop({ index: true })
  author: string;

  @Prop()
  picture: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
      },
    ],
  })
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
