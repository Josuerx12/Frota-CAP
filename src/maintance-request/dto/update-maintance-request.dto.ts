import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintanceRequestDto } from './create-maintance-request.dto';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class UpdateMaintanceRequestDto extends PartialType(
  CreateMaintanceRequestDto,
) {
  @IsOptional()
  @IsUUID('4', { message: 'ID da oficina deve ser um id valido!' })
  workShopId?: string;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'Data para levar veiculo até a oficina é obrigatoria!' },
  )
  deadlineToForward?: string | Date;
}
