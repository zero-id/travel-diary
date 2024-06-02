import { Injectable } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createJourneySchema, updateJourneySchema } from './validation';

@Injectable()
export class JourneyService {
  constructor(private prisma: PrismaService) {}
  async create(createJourneyDto: CreateJourneyDto) {
    const { error } = createJourneySchema.validate(createJourneyDto);

    if (error) {
      throw new Error(error.details[0].message);
    }
    return await this.prisma.journey.create({ data: createJourneyDto });
  }

  async findAll() {
    return await this.prisma.journey.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.journey.findUnique({ where: { id } });
  }

  async findByUserId(userId: string) {
    return await this.prisma.journey.findMany({ where: { userId } });
  }

  async update(id: number, userId: string, updateJourneyDto: UpdateJourneyDto) {
    const journey = await this.prisma.journey.findUnique({
      where: { id, userId },
    });

    if (!journey) {
      throw new Error('Journey not found');
    }

    if (updateJourneyDto.title) journey.title = updateJourneyDto.title;

    if (updateJourneyDto.description)
      journey.description = updateJourneyDto.description;

    if (updateJourneyDto.image) journey.image = updateJourneyDto.image;

    const { error } = updateJourneySchema.validate(updateJourneyDto);

    if (error) {
      throw new Error(error.details[0].message);
    }

    return await this.prisma.journey.update({
      where: { id },
      data: journey,
    });
  }

  async remove(id: number) {
    return await this.prisma.journey.delete({ where: { id } });
  }

  async searchJourneys(query: string) {
    console.log(query, 'ini query');

    try {
      const journeys = await this.prisma.journey.findMany({
        where: {
          title: {
            contains: query,
          },
        },
      });
      return journeys;
    } catch (error) {
      console.error('Error searching journeys:', error);
      throw error;
    }
  }
}
