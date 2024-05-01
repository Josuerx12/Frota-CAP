import { IMaintenceRequest } from './interfaces/MaintenceRequest';
export declare class EmailService {
    private transporter;
    constructor();
    send(to: string, request: IMaintenceRequest): Promise<void>;
}
