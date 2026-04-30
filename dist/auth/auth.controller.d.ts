import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../common/enums.js").Role;
        };
    }>;
    getProfile(req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../common/enums.js").Role;
    }>;
}
