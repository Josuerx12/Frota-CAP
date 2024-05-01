import { Prisma } from '@prisma/client';
export declare class Vehicle implements Prisma.VehicleUncheckedCreateInput {
    name: string;
    plate: string;
    providerId: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
