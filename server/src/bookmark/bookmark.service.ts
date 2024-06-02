import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createDelete(createBookmarkDto: CreateBookmarkDto) {
    const isExists = await this.prisma.journey.findFirst({
      where: {
        id: createBookmarkDto.journeyId,
      },
    });

    if (!isExists) {
      throw new BadRequestException('Journey not found');
    }

    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId: createBookmarkDto.userId,
        journeyId: createBookmarkDto.journeyId,
      },
    });

    if (bookmark) {
      await this.prisma.bookmark.deleteMany({
        where: {
          userId: createBookmarkDto.userId,
          journeyId: createBookmarkDto.journeyId,
        },
      });

      return 'bookmark deleted';
    } else {
      await this.prisma.bookmark.create({
        data: {
          userId: createBookmarkDto.userId,
          journeyId: createBookmarkDto.journeyId,
        },
      });

      return 'bookmark created';
    }
  }

  async findAll(userId: string) {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        journey: true,
      }
    });
  }
}
