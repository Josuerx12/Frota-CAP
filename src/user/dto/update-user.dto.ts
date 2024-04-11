import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(3, 155, { message: 'Nome deve conter de 3 até 155 caracteres.' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail deve ser um e-mail válido' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR', { message: 'Numero deve ser um numero válido' })
  phone: string;

  @IsOptional()
  position: string[];

  @IsOptional()
  @IsStrongPassword({ minLength: 6, minUppercase: 1 })
  password: string;

  @IsOptional()
  confirmPassword: string;
}
