import { AuthService } from './auth.service';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentials: LoginCredetialsDto): Promise<{
        token: string;
    }>;
    loginWorkshop(credentials: LoginCredetialsDto): Promise<{
        token: string;
    }>;
}
