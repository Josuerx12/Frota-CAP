import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Request } from 'express';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    create(createVehicleDto: CreateVehicleDto, req: Request): Promise<string>;
    findAll(req: Request): Promise<{
        vehicles: ({
            provider: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            name: string;
            plate: string;
            active: boolean;
            providerId: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        vehicle: {
            id: number;
            name: string;
            plate: string;
            active: boolean;
            providerId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: string, updateVehicleDto: UpdateVehicleDto, req: Request): Promise<string>;
    remove(id: number, req: Request): Promise<string>;
}
