import { Prisma } from '@prisma/client';

export class Vehicle implements Prisma.VehicleUncheckedCreateInput {
  plate: string;
  providerId: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
