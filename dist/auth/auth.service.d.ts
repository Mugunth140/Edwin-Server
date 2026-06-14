import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(identifier: string, password: string): Promise<User>;
    login(identifier: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("../common/enums.js").Role;
            projects: {
                id: string;
            }[];
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../common/enums.js").Role;
        projects: {
            id: string;
        }[];
    }>;
}
