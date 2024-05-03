import { Prisma } from '@prisma/client';

export class MaintanceRequest
  implements Prisma.MaintenceRequestUncheckedCreateInput
{
  driverPhone: string;
  id?: number;
  driverName: string;

  km: number;
  os: number;
  protocol?: string;
  service: string;
  serviceStartAt?: string | Date;
  serviceEndAt?: string | Date;
  serviceTime?: number;
  workShopId?: number;
  deadlineToForward?: string | Date;
  status?: number;
  atendedBy?: string;
  atendedAt?: string | Date;
  timeToSchedule?: number;
  scheduledAt?: string | Date;
  deadlineToDeliver?: string | Date;
  delivered?: boolean;
  deliveredAt?: string | Date;
  finishedBy?: string;
  finishedAt?: string | Date;
  checkoutBy?: string;
  checkoutAt?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  plate: string;
  ownerId?: string;
  budgets?: Prisma.budgetUncheckedCreateNestedManyWithoutMaintenceInput;
}
