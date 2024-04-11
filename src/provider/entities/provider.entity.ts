import { Prisma } from '@prisma/client';

export class Provider implements Prisma.ProviderUncheckedCreateInput {
  id?: number;
  name: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  Vehicle?: Prisma.VehicleUncheckedCreateNestedManyWithoutProviderInput;
}
