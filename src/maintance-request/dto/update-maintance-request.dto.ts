import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintanceRequestDto } from './create-maintance-request.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateMaintanceRequestDto extends PartialType(
  CreateMaintanceRequestDto,
) {
  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'Data para levar veiculo até a oficina é obrigatoria!' },
  )
  deadlineToForward?: string | Date;
}
