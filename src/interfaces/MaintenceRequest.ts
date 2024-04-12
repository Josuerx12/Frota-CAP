interface IMaintenceRequest {
  id: number;
  plate: string;
  driverName: string;
  km: number;
  ownerOfReqId: string;
  observation?: string;
  status: number;
  atendedBy?: string;
  atendedAt?: Date;
  finishedBy?: string;
  finishedAt?: Date;
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
