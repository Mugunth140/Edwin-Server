import { VendorsService } from './vendors.service.js';
import { CreateVendorDto } from './dto/create-vendor.dto.js';
import { UpdateVendorDto } from './dto/update-vendor.dto.js';
export declare class VendorsController {
    private readonly vendorsService;
    constructor(vendorsService: VendorsService);
    create(dto: CreateVendorDto): Promise<import("./entities/vendor.entity.js").Vendor>;
    findAll(): Promise<import("./entities/vendor.entity.js").Vendor[]>;
    update(id: string, dto: UpdateVendorDto): Promise<import("./entities/vendor.entity.js").Vendor>;
    remove(id: string): Promise<void>;
}
