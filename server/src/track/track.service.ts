import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Track, TrackDocument } from 'src/track/schemas/track.schema';
import { Comment, CommentDocument } from 'src/track/schemas/comment.schema';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { CreateCommentDto } from 'src/track/dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {

  constructor (
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {
  }

  create (dto: CreateTrackDto, picture, audio): Promise<Track> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    return this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
  }

  async getAll (count = 10, offset = 0): Promise<Track[]> {
    return await this.trackModel.find()
      .sort({ _id: -1 })
      .skip(Number(offset))
      .limit(Number(count));
  }

  async search (query: string, count = 10, offset = 0): Promise<Track[]> {
    const reg = new RegExp(query, 'i');
    const queryFilter: any = {
      $or: [
        { name: reg },
        { artist: reg },
        { text: reg },
      ],
    };
    return this.trackModel.find(queryFilter)
      .sort({ _id: -1 })
      .skip(Number(offset))
      .limit(Number(count));
  }

  async getOne (id: ObjectId): Promise<Track> {
    return await this.trackModel.findById(id).populate('comments');
  }

  async delete (id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    if (track?.picture) {
      this.fileService.removeFile(track.picture);
    }
    if (track?.audio) {
      this.fileService.removeFile(track.audio);
    }
    return track?._id;
  }

  async addComment (dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.track);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen (id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    track.listens += 1;
    await track.save();
    return track;
  }

}
