import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: string;
  email?: string;
  fullname?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  password?: string;
}
