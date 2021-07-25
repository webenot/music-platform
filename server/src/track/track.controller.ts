import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

import { TrackService } from 'src/track/track.service';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { CreateCommentDto } from 'src/track/dto/create-comment.dto';

@Controller('/tracks')
export class TrackController {

  constructor (private trackService: TrackService) {
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {
      name: 'picture',
      maxCount: 1,
    },
    {
      name: 'audio',
      maxCount: 1,
    },
  ]))
  create (@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const {
      picture,
      audio,
    } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  getAll (
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search (
    @Query('query') query: string,
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.trackService.search(query, count, offset);
  }

  @Get(':id')
  getOne (@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete (@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment (@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Patch('/listen/:id')
  listen (@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }

}
