import { Prisma } from '@prisma/client';

export class MaintanceRequest
  implements Prisma.MaintenceRequestUncheckedCreateInput
{
  service: string;
  serviceEndAt?: string | Date;
  scheduledAt?: string | Date;
  timeToSchedule?: number;
  serviceStartAt?: string | Date;
  serviceTime?: number;
  deadlineToForward?: string | Date;
  workShopId: number;
  checkoutAt?: string | Date;
  checkoutBy?: string;
  deadlineToDeliver?: string | Date;
  delivered?: boolean;
  deliveredAt?: string | Date;
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
