import { IsEmail, IsString } from 'class-validator';

export class LoginCredetialsDto {
  @IsEmail({}, { message: 'E-mail informado não é valido!' })
  email: string;
  @IsString({ message: 'Senha informada, não é valida!' })
  password: string;
}
