import {
  IsBoolean,
  IsEmail,
  IsOptional,
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

  @IsStrongPassword(
    { minLength: 6, minUppercase: 1 },
    {
      message: 'Senha deve conter pelo menos 6 caracteres e 1 letra maiuscula',
    },
  )
  password: string;

  @IsString({ message: 'Confirmação de senha é obrigatoria!' })
  confirmPassword: string;

  @IsOptional()
  @IsBoolean({ message: 'Admin deve ser um valor booleano' })
  admin?: boolean;
  @IsOptional()
  @IsBoolean({ message: 'Frotas deve ser um valor booleano' })
  frotas?: boolean;
}
