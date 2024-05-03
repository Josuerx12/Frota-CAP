import { IMaintenceRequest } from './MaintenceRequest';
export interface IWorkshop {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    Address?: IAddress;
    MaintenceRequest?: IMaintenceRequest[];
}
export interface IAddress {
    id: number;
    street: string;
    number: number;
    cep: number;
    city: string;
    state: string;
    country: string;
}
