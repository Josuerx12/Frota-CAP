import { Vehicle } from '../entities/vehicle.entity';
export declare class CreateVehicleDto extends Vehicle {
    name: string;
    plate: string;
    providerId: number;
}
