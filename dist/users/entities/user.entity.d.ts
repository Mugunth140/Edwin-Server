import { Role } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
export declare class User {
    id: string;
    name: string;
    email: string;
    username: string;
    employeeId: string;
    phone: string;
    address: string;
    passwordHash: string;
    role: Role;
    isActive: boolean;
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;
}
