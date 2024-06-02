import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { signInSchema, signUpSchema } from './validation';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signUp(payload: SignUpDto) {
    const { error, value } = signUpSchema.validate(payload);

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    const isExists = await this.prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });

    if (isExists) {
      throw new BadRequestException('User already exists');
    }

    const hasdPassword = await bcrypt.hash(value.password, 10);

    await this.prisma.user.create({
      data: {
        ...value,
        password: hasdPassword,
      },
    });

    return 'Register Succes!';
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const { error, value } = signInSchema.validate({ email, password });

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(value.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwt.signAsync({
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        fullname: user.fullname,
        phone: user.phone,
        address: user.address,
      }),
    };
  }
}
