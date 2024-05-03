import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, req: Request): Promise<string>;
    findAll(req: Request): Promise<{
        users: {
            name: string;
            email: string;
            phone: string;
            admin: boolean;
            frotas: boolean;
            requester: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    profile(req: Request): Promise<{
        user: {
            name: string;
            email: string;
            phone: string;
            admin: boolean;
            frotas: boolean;
            requester: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            email: string;
            phone: string;
            admin: boolean;
            frotas: boolean;
            requester: boolean;
            id: string;
            MaintenceRequest: {
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
            }[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<string>;
    remove(id: string, req: Request): Promise<string>;
}
