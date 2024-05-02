/// <reference types="multer" />
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { IUser } from 'src/interfaces/User';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from '../email.service';
import { IMaintenceRequest } from 'src/interfaces/MaintenceRequest';
import { IWorkshop } from 'src/interfaces/Workshop';
export declare class MaintanceRequestService {
    private readonly db;
    private readonly mail;
    private api;
    constructor(db: PrismaService, mail: EmailService);
    wppMessageTemplate(req: IMaintenceRequest): string;
    create(createMaintanceRequestDto: CreateMaintanceRequestDto, user: IUser): Promise<string>;
    findAll(user: IUser, workshop: IWorkshop): Promise<{
        requests: ({
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
    findOne(id: number, user: IUser, workshop: IWorkshop): Promise<{
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
    findByUser(user: IUser): Promise<{
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
    findByWorkshop(ws: IWorkshop): Promise<{
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
    basicValidations(request: IMaintenceRequest, updatedCredentials: UpdateMaintanceRequestDto, user?: IUser, workshop?: IWorkshop): void;
    update(id: number, updateMaintanceRequestDto: UpdateMaintanceRequestDto, user: IUser, workshop: IWorkshop, file: Express.Multer.File): Promise<string>;
    remove(id: number, user: IUser): Promise<string>;
}
