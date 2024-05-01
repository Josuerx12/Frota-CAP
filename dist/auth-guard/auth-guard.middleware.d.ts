import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { IUser } from 'src/interfaces/User';
import { IWorkshop } from 'src/interfaces/Workshop';
import { PrismaService } from 'src/prisma.service';
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            workshop?: IWorkshop;
        }
    }
}
export declare class AuthGuardMiddleware implements NestMiddleware {
    private readonly db;
    constructor(db: PrismaService);
    use(req: Request, res: Response, next: NextFunction): void;
}
