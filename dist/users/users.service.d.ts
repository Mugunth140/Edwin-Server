import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<Omit<User, 'passwordHash'>>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
}
