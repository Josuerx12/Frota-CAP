/// <reference types="multer" />
import { MaintanceRequestService } from './maintance-request.service';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { Request } from 'express';
export declare class MaintanceRequestController {
    private readonly maintanceRequestService;
    constructor(maintanceRequestService: MaintanceRequestService);
    create(createMaintanceRequestDto: CreateMaintanceRequestDto, req: Request): Promise<string>;
    findAll(req: Request): Promise<{
        requests: ({
            Workshop: {
                id: number;
                name: string;
                email: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
            budgets: {
                id: number;
                url: string;
                key: string;
                maintenceId: number;
                status: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            Vehicle: {
                id: number;
                name: string;
                plate: string;
                active: boolean;
                providerId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            Owner: {
                id: string;
                email: string;
                phone: string;
                name: string;
                requester: boolean;
                frotas: boolean;
                admin: boolean;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        })[];
    }>;
    findByUser(req: Request): Promise<{
        requests: ({
            Workshop: {
                id: number;
                name: string;
                email: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
            budgets: {
                id: number;
                url: string;
                key: string;
                maintenceId: number;
                status: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            Vehicle: {
                id: number;
                name: string;
                plate: string;
                active: boolean;
                providerId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            Owner: {
                id: string;
                email: string;
                phone: string;
                name: string;
                requester: boolean;
                frotas: boolean;
                admin: boolean;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        })[];
    }>;
    findByWorkshop(req: Request): Promise<{
        requests: ({
            Workshop: {
                id: number;
                name: string;
                email: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
            budgets: {
                id: number;
                url: string;
                key: string;
                maintenceId: number;
                status: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            Vehicle: {
                id: number;
                name: string;
                plate: string;
                active: boolean;
                providerId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            Owner: {
                id: string;
                email: string;
                phone: string;
                name: string;
                requester: boolean;
                frotas: boolean;
                admin: boolean;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        })[];
    }>;
    findOne(id: string, req: Request): Promise<{
        request: {
            Workshop: {
                id: number;
                name: string;
                email: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
            budgets: {
                id: number;
                url: string;
                key: string;
                maintenceId: number;
                status: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            Vehicle: {
                id: number;
                name: string;
                plate: string;
                active: boolean;
                providerId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            Owner: {
                id: string;
                email: string;
                phone: string;
                name: string;
                requester: boolean;
                frotas: boolean;
                admin: boolean;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        };
    }>;
    update(id: string, updateMaintanceRequestDto: UpdateMaintanceRequestDto, req: Request, file: Express.Multer.File): Promise<string>;
    remove(id: string, req: Request): Promise<string>;
}
