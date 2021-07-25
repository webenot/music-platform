import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Comment } from 'src/track/schemas/comment.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    index: true,
  })
  artist: string;

  @Prop({ default: '' })
  text: string;

  @Prop({
    index: true,
    default: 0,
  })
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
