import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Address {
  @IsString({ message: 'Nome da rua é obrigatório e deve ser informado.' })
  street: string;

  @IsNumber(
    { allowNaN: false },
    { message: 'CEP é obrigatorio e deve ser informado.' },
  )
  cep: number;

  @IsNumber(
    { allowNaN: false },
    { message: 'Numero de indentificação do local deve ser informado.' },
  )
  number: number;

  @IsString({ message: 'Nome da cidade deve ser informada.' })
  city: string;

  @IsString({ message: 'Nome do estado deve ser informado.' })
  state: string;

  @IsString({ message: 'Nome do país deve ser informado.' })
  country: string;
}

export class CreateWorkshopDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
