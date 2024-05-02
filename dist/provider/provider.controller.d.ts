import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Request } from 'express';
export declare class ProviderController {
    private readonly providerService;
    constructor(providerService: ProviderService);
    create(createProviderDto: CreateProviderDto, req: Request): Promise<string>;
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
    findOne(id: string): Promise<{
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
    update(id: string, updateProviderDto: UpdateProviderDto, req: Request): Promise<string>;
    remove(id: string, req: Request): Promise<string>;
}
