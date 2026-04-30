import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity.js';
import { CreateVendorDto } from './dto/create-vendor.dto.js';
export declare class VendorsService {
    private vendorsRepository;
    constructor(vendorsRepository: Repository<Vendor>);
    create(dto: CreateVendorDto): Promise<Vendor>;
    findAll(): Promise<Vendor[]>;
    findOne(id: string): Promise<Vendor>;
}
