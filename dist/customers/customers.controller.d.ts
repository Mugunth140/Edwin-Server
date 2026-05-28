import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(dto: CreateCustomerDto): Promise<import("./entities/customer.entity.js").Customer>;
    findAll(): Promise<import("./entities/customer.entity.js").Customer[]>;
    update(id: string, dto: Partial<CreateCustomerDto>): Promise<import("./entities/customer.entity.js").Customer>;
    remove(id: string): Promise<void>;
}
