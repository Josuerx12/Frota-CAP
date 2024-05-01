import { User } from '../entities/user.entity';
export declare class CreateUserDto extends User {
    name: string;
    email: string;
    phone: string;
    position: string[];
    password: string;
    confirmPassword: string;
    admin?: boolean;
    workshop?: boolean;
    frotas?: boolean;
}
