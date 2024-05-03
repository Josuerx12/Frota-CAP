import { IWorkshop } from './Workshop';

interface IMaintenceRequest {
  id: number;
  plate: string;
  os: number;
  driverName: string;
  protocol?: string;
  driverPhone: string;
  km: number;
  ownerId: string;
  observation?: string;
  deadlineToForward?: Date | string;
  deadlineToDeliver?: Date | string;
  delivered: boolean;
  Workshop?: IWorkshop;
  deliveredAt?: Date | string;
  status: number;
  atendedBy?: string;
  atendedAt?: Date;
  finishedBy?: string;
  finishedAt?: Date;
  checkoutBy?: string;
  checkoutAt?: Date | string;
  budget?: IBudget[];
  createdAt: Date;
  updatedAt: Date;
}

interface IBudget {
  id: number;
  url: string;
  path: string;
  maintanceId: number;
  createdAt: Date;
  updatedAt: Date;
}

export { IMaintenceRequest, IBudget };
