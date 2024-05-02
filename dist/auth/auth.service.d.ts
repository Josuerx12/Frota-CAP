import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly db;
    constructor(db: PrismaService);
    login(credentials: LoginCredetialsDto): Promise<{
        token: string;
    }>;
    loginWorkshop(credentials: LoginCredetialsDto): Promise<{
        token: string;
    }>;
}
