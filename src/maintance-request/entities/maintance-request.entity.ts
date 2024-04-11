import { Prisma } from '@prisma/client';

export class MaintanceRequest
  implements Prisma.MaintenceRequestUncheckedCreateInput
{
  driverName: string;
  id?: number;
  plate: string;
  km: number;
  ownerOfReqId: string;
  observation?: string;
  status?: number;
  atendedBy?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  atendedAt?: string | Date;
  budgets?: Prisma.budgetUncheckedCreateNestedManyWithoutMaintenceInput;
  finishedAt?: string | Date;
  finishedBy?: string;
}
