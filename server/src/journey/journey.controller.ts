import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Request, Response } from 'express';

@Controller('journey')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Post()
  async create(
    @Body() createJourneyDto: CreateJourneyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      createJourneyDto.userId = res.locals.user;

      if (req['uploadedFileUrl'])
        createJourneyDto.image = req['uploadedFileUrl'];

      console.log(createJourneyDto, 'ini createJourneyDto');

      const journey = await this.journeyService.create(createJourneyDto);

      return res.status(201).json({ journey });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get()
  async findAll() {
    const journeys = await this.journeyService.findAll();
    return {
      count: journeys.length,
      data: journeys,
    };
  }

  @Get('/user')
  async findByUserId(@Res() res: Response) {
    const userId = res.locals.user;
    const journeys = await this.journeyService.findByUserId(userId);
    return res.json({
      count: journeys.length,
      data: journeys,
    });
  }

  @Get('/search')
  async searchJourneys(@Query('title') title: string) {
    console.log(title);

    const journeys = await this.journeyService.searchJourneys(title);
    return { count: journeys.length, data: journeys };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const journey = this.journeyService.findOne(+id);
    return journey;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateJourneyDto: UpdateJourneyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (req['uploadedFileUrl']) updateJourneyDto.image = req['uploadedFileUrl'];

    console.log(updateJourneyDto, 'ini updateJourneyDto');

    const userId = res.locals.user;

    console.log(userId, 'ini userId');

    const journey = await this.journeyService.update(
      +id,
      userId,
      updateJourneyDto,
    );

    return res.status(200).json({ journey });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.journeyService.remove(+id);
    return { message: 'Journey deleted successfully', status: 200 };
  }
}
