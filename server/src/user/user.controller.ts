import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { log } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/detail')
  async findOne(@Res() res: Response) {
    const id = res.locals.user;

    const user = await this.userService.findOne(id);

    const { password, ...reuslt } = user;

    return res.json({
      data: reuslt,
    });
  }

  @Patch()
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = res.locals.user;

    if (req['uploadedFileUrl']) updateUserDto.avatar = req['uploadedFileUrl'];

    const user = await this.userService.update(id, updateUserDto);

    return res.status(200).json(user);
  }

  @Delete()
  remove(@Res() res: Response) {
    const id = res.locals.user;

    this.userService.remove(id);

    return res.json({ message: 'User deleted successfully', status: 200 });
  }
}
