import { Role } from '../../common/enums.js';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: Role;
}
