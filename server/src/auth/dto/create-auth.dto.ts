export class SignUpDto {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar?: string;
}

export class SignInDto {
  email: string;
  password: string;
}
