import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintanceRequestDto } from './create-maintance-request.dto';

export class UpdateMaintanceRequestDto extends PartialType(CreateMaintanceRequestDto) {}
