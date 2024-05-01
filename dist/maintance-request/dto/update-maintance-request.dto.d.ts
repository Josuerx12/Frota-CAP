import { CreateMaintanceRequestDto } from './create-maintance-request.dto';
declare const UpdateMaintanceRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMaintanceRequestDto>>;
export declare class UpdateMaintanceRequestDto extends UpdateMaintanceRequestDto_base {
    deadlineToForward?: string | Date;
}
export {};
