import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/interfaces/User';
export declare class ProviderService {
    private readonly db;
    constructor(db: PrismaService);
    create(credentials: CreateProviderDto, user: IUser): Promise<string>;
    findAll(): Promise<{
        providers: ({
            Vehicle: {
                id: number;
                name: string;
                plate: string;
                active: boolean;
                providerId: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: number): Promise<{
        provider: {
            Vehicle: {
                id: number;
                name: string;
                plate: string;
                active: boolean;
                providerId: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: number, updateProviderDto: UpdateProviderDto, user: IUser): Promise<string>;
    remove(id: number, user: IUser): Promise<string>;
}
