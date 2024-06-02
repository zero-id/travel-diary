import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateUserSchema } from './validation';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        journey: true,
        bookmark: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        journey: true,
        bookmark: {
         select: {
          journey: true,
         }
        },
      },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new UnauthorizedException();
    }

    if (updateUserDto.email) user.email = updateUserDto.email;

    if (updateUserDto.fullname) user.fullname = updateUserDto.fullname;

    if (updateUserDto.phone) user.phone = updateUserDto.phone;

    if (updateUserDto.address) user.address = updateUserDto.address;

    if (updateUserDto.avatar) user.avatar = updateUserDto.avatar;

    const { error, value } = updateUserSchema.validate(user);

    if (error) {
      throw new Error(error.details[0].message);
    }

    return await this.prisma.user.update({
      where: { id },
      data: value,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
