import { Prisma } from '@prisma/client';
export class Workshop implements Prisma.WorkshopUncheckedCreateInput {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  Address?: Prisma.AddressUncheckedCreateNestedOneWithoutWorkshopInput;
  MaintenceRequest?: Prisma.MaintenceRequestUncheckedCreateNestedManyWithoutWorkshopInput;
}
