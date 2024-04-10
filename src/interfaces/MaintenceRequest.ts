interface MaintenceRequest {
  id: number;
  plate: string;
  km: number;
  ownerOfReqId: string;
  observation: string;
  status: number;
  atendedBy: string;
}

export { MaintenceRequest };
