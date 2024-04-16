interface IMaintenceRequest {
  id: number;
  plate: string;
  driverName: string;
  km: number;
  ownerOfReqId: string;
  observation?: string;
  deadlineToForward?: Date | string;
  deadlineToDeviler?: Date | string;
  delivered: boolean;
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
