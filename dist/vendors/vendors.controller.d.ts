import { VendorsService } from './vendors.service.js';
import { CreateVendorDto } from './dto/create-vendor.dto.js';
export declare class VendorsController {
    private readonly vendorsService;
    constructor(vendorsService: VendorsService);
    create(dto: CreateVendorDto): Promise<import("./entities/vendor.entity.js").Vendor>;
    findAll(): Promise<import("./entities/vendor.entity.js").Vendor[]>;
}
