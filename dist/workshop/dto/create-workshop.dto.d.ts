declare class Address {
    street: string;
    cep: number;
    number: number;
    city: string;
    state: string;
    country: string;
}
export declare class CreateWorkshopDto {
    email: string;
    name: string;
    password: string;
    address: Address;
}
export {};
