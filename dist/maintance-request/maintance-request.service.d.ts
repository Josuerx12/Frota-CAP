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
            evidence: {
                id: number;
                key: string;
                url: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                maintenanceId: number;
            }[];
            Workshop: {
                name: string;
                email: string;
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
                name: string;
                email: string;
                phone: string;
            };
        } & {
            id: number;
            driverName: string;
            driverPhone: string;
            km: number;
            os: number;
            protocol: string;
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
    findByUser(user: IUser): Promise<{
        requests: ({
            evidence: {
                id: number;
                key: string;
                url: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                maintenanceId: number;
            }[];
            Workshop: {
                name: string;
                email: string;
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
                name: string;
                email: string;
                phone: string;
            };
        } & {
            id: number;
            driverName: string;
            driverPhone: string;
            km: number;
            os: number;
            protocol: string;
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
            evidence: {
                id: number;
                key: string;
                url: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                maintenanceId: number;
            }[];
            Workshop: {
                name: string;
                email: string;
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
                name: string;
                email: string;
                phone: string;
            };
        } & {
            id: number;
            driverName: string;
            driverPhone: string;
            km: number;
            os: number;
            protocol: string;
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
    update(id: number, updateMaintanceRequestDto: UpdateMaintanceRequestDto, user: IUser, workshop: IWorkshop, budget: Express.Multer.File, files: Express.Multer.File[]): Promise<string>;
    remove(id: number, user: IUser): Promise<string>;
}
