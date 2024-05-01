import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/interfaces/User';
export declare class UserService {
    private db;
    constructor(db: PrismaService);
    create(createUserDto: CreateUserDto, userAuthenticated: IUser): Promise<string>;
    findAll(userAuthenticated: IUser): Promise<{
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
        };
    }>;
    profile(user: IUser): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto, user: IUser): Promise<string>;
    remove(id: string, user: IUser): Promise<string>;
}
