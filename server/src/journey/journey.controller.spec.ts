import { Test, TestingModule } from '@nestjs/testing';
import { JourneyController } from './journey.controller';
import { JourneyService } from './journey.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('JourneyController', () => {
  let controller: JourneyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneyController],
      providers: [JourneyService, PrismaService],
    }).compile();

    controller = module.get<JourneyController>(JourneyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
