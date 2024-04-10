import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(3, 155, { message: 'Nome deve conter de 3 até 155 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'E-mail deve ser um e-mail válido' })
  email: string;

  @IsPhoneNumber('BR', { message: 'Numero deve ser um numero válido' })
  phone: number;

  position: string[] | string;

  @IsStrongPassword({ minLength: 6, minUppercase: 1 })
  password: string;

  @IsString()
  confirmPassword: string;
}
