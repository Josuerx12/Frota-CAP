import { Workshop } from '../entities/workshop.entity';
declare class Address {
    street: string;
    cep: number;
    number: number;
    city: string;
    state: string;
    country: string;
}
export declare class CreateWorkshopDto extends Workshop {
    email: string;
    phone: string;
    name: string;
    password: string;
    address: Address;
}
export {};
