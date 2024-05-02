import { Prisma } from '@prisma/client';
import { MaintanceRequest } from '../entities/maintance-request.entity';
export declare class CreateMaintanceRequestDto extends MaintanceRequest {
    km: number;
    driverName: string;
    plate: string;
    service: string;
    status?: number;
    atendedBy?: string;
    atendedAt?: string | Date;
    finishedBy?: string;
    finishedAt?: string | Date;
    budgets?: Prisma.budgetUncheckedCreateNestedManyWithoutMaintenceInput;
}
