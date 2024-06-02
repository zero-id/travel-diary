import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Response } from 'express';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  async create(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @Res() res: Response,
  ) {
    createBookmarkDto.userId = res.locals.user;

    const result = await this.bookmarkService.createDelete(createBookmarkDto);

    return res.status(201).json({ result });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const userId = res.locals.user;
    console.log(userId, 'ini userId');
    
    const data = await this.bookmarkService.findAll(userId);

    return res.status(200).json({ data });
  }
}
