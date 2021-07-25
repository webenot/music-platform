import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { Track } from 'src/track/schemas/track.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    index: true,
    required: true,
  })
  track: Track;

  @Prop({
    required: true,
    index: true,
  })
  username: string;

  @Prop({ required: true })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
