import { WorkshopService } from './workshop.service';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { Request } from 'express';
export declare class WorkshopController {
    private readonly workshopService;
    constructor(workshopService: WorkshopService);
    create(createWorkshopDto: CreateWorkshopDto, req: Request): Promise<string>;
    findAll(): Promise<{
        workshops: {
            name: string;
            email: string;
            id: number;
            MaintenceRequest: {
                id: number;
                driverName: string;
                km: number;
                service: string;
                serviceStartAt: Date;
                serviceEndAt: Date;
                serviceTime: number;
                workShopId: number;
                deadlineToForward: Date;
                status: number;
                atendedBy: string;
                atendedAt: Date;
                timeToSchedule: number;
                scheduledAt: Date;
                deadlineToDeliver: Date;
                delivered: boolean;
                deliveredAt: Date;
                finishedBy: string;
                finishedAt: Date;
                checkoutBy: string;
                checkoutAt: Date;
                createdAt: Date;
                updatedAt: Date;
                plate: string;
                ownerId: string;
            }[];
            createdAt: Date;
            updatedAt: Date;
            Address: {
                id: number;
                street: string;
                number: number;
                cep: number;
                city: string;
                state: string;
                workshopId: number;
                country: string;
            };
        }[];
    }>;
    loggedWorkshopDetails(req: Request): Promise<{
        workshop: {
            name: string;
            email: string;
            id: number;
            MaintenceRequest: {
                id: number;
                driverName: string;
                km: number;
                service: string;
                serviceStartAt: Date;
                serviceEndAt: Date;
                serviceTime: number;
                workShopId: number;
                deadlineToForward: Date;
                status: number;
                atendedBy: string;
                atendedAt: Date;
                timeToSchedule: number;
                scheduledAt: Date;
                deadlineToDeliver: Date;
                delivered: boolean;
                deliveredAt: Date;
                finishedBy: string;
                finishedAt: Date;
                checkoutBy: string;
                checkoutAt: Date;
                createdAt: Date;
                updatedAt: Date;
                plate: string;
                ownerId: string;
            }[];
            createdAt: Date;
            updatedAt: Date;
            Address: {
                id: number;
                street: string;
                number: number;
                cep: number;
                city: string;
                state: string;
                workshopId: number;
                country: string;
            };
        };
    }>;
    findOne(id: string): Promise<{
        workshop: {
            name: string;
            email: string;
            id: number;
            MaintenceRequest: {
                id: number;
                driverName: string;
                km: number;
                service: string;
                serviceStartAt: Date;
                serviceEndAt: Date;
                serviceTime: number;
                workShopId: number;
                deadlineToForward: Date;
                status: number;
                atendedBy: string;
                atendedAt: Date;
                timeToSchedule: number;
                scheduledAt: Date;
                deadlineToDeliver: Date;
                delivered: boolean;
                deliveredAt: Date;
                finishedBy: string;
                finishedAt: Date;
                checkoutBy: string;
                checkoutAt: Date;
                createdAt: Date;
                updatedAt: Date;
                plate: string;
                ownerId: string;
            }[];
            createdAt: Date;
            updatedAt: Date;
            Address: {
                id: number;
                street: string;
                number: number;
                cep: number;
                city: string;
                state: string;
                workshopId: number;
                country: string;
            };
        };
    }>;
    update(id: string, updateWorkshopDto: UpdateWorkshopDto, req: Request): Promise<string>;
    remove(id: string, req: Request): Promise<string>;
}
