import { Role } from '../../common/enums.js';
export declare class User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
