import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(3, 155, { message: 'Nome deve conter de 3 até 155 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'E-mail deve ser um e-mail válido' })
  email: string;

  @IsPhoneNumber('BR', { message: 'Numero deve ser um numero válido' })
  phone: string;

  position: string[];

  @IsStrongPassword({ minLength: 6, minUppercase: 1 })
  password: string;

  @IsString()
  confirmPassword: string;
}
