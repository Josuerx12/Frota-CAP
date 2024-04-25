import { Prisma } from '@prisma/client';
import { MaintanceRequest } from '../entities/maintance-request.entity';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateMaintanceRequestDto extends MaintanceRequest {
  @IsInt({ message: 'KM do veiculo é obrigatório!' })
  km: number;

  @IsString({ message: 'Nome do motorista é obrigatório!' })
  @Length(3, 100, { message: 'Nome do motorista deve ter de 3 a 100 letras.' })
  driverName: string;

  @IsString({ message: 'Placa do veiculo é obrigatório!' })
  @Length(7, 7, {
    message: 'Placa deve conter 7 caracteres, sendo 4 letras e 3 numeros!',
  })
  plate: string;

  @IsString({ message: 'Serviço da solicitação é uma informação obrigatorio.' })
  @Length(4, 255, {
    message: 'Observação deve ter de 4 a 255 letras e ou numeros.',
  })
  service: string;

  @IsOptional()
  @IsInt({ message: 'Status deve ser informado através de um numero!' })
  status?: number;

  @IsOptional()
  @IsString({ message: 'Nome de quem atendeu deve ser uma linha de letras.' })
  atendedBy?: string;

  @IsOptional()
  @IsDateString(
    { strict: false },
    { message: 'Data deve ser uma data valida!' },
  )
  atendedAt?: string | Date;

  @IsOptional()
  @IsString({ message: 'Nome de quem atendeu deve ser uma linha de letras.' })
  finishedBy?: string;

  @IsOptional()
  @IsDateString(
    { strict: false },
    { message: 'Data deve ser uma data valida!' },
  )
  finishedAt?: string | Date;

  @IsOptional()
  @IsArray({ message: 'Orçamento deve ser um array.' })
  budgets?: Prisma.budgetUncheckedCreateNestedManyWithoutMaintenceInput;
}
