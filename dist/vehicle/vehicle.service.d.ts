import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/interfaces/User';
export declare class VehicleService {
    private readonly db;
    constructor(db: PrismaService);
    create(createVehicleDto: CreateVehicleDto, user: IUser): Promise<string>;
    findAll(user: IUser): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, updateVehicleDto: UpdateVehicleDto, user: IUser): Promise<string>;
    remove(id: number, user: IUser): Promise<string>;
}
