import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [JourneyController],
  providers: [JourneyService, PrismaService],
})
export class JourneyModule {}
