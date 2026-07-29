import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorQuotation } from './entities/vendor-quotation.entity.js';
import { CreateVendorQuotationDto } from './dto/create-vendor-quotation.dto.js';
import { UpdateVendorQuotationDto } from './dto/update-vendor-quotation.dto.js';

@Injectable()
export class VendorQuotationsService {
  constructor(
    @InjectRepository(VendorQuotation)
    private repo: Repository<VendorQuotation>,
  ) {}

  async generateNextEnquiryNo(): Promise<string> {
    return this.generateEnquiryNo();
  }

  private async generateEnquiryNo(): Promise<string> {
    const year = new Date().getFullYear();
    const last = await this.repo
      .createQueryBuilder('vq')
      .where('vq.enquiryNo LIKE :prefix', { prefix: `PE-${year}-%` })
      .orderBy('vq.enquiryNo', 'DESC')
      .getOne();
    let seq = 1;
    if (last) {
      const parts = last.enquiryNo.split('-');
      seq = parseInt(parts[2], 10) + 1;
    }
    return `PE-${year}-${String(seq).padStart(3, '0')}`;
  }

  async create(dto: CreateVendorQuotationDto, enquiryNo?: string): Promise<VendorQuotation> {
    if (!enquiryNo) enquiryNo = await this.generateEnquiryNo();
    const quotation = this.repo.create({
      enquiryNo,
      projectId: dto.projectId,
      vendorId: dto.vendorId,
      items: dto.items,
      materialRequirementId: dto.materialRequirementId,
      status: 'pending',
    });
    return this.repo.save(quotation);
  }

  async findAll() {
    return this.repo.find({
      where: { isDeleted: false },
      relations: ['project', 'vendor', 'materialRequirement'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const quotation = await this.repo.findOne({
      where: { id, isDeleted: false },
      relations: ['project', 'vendor', 'materialRequirement'],
    });
    if (!quotation) throw new NotFoundException('Vendor quotation not found');
    return quotation;
  }

  async update(id: string, dto: UpdateVendorQuotationDto): Promise<VendorQuotation> {
    const quotation = await this.findOne(id);
    Object.assign(quotation, dto);
    return this.repo.save(quotation);
  }

  async remove(id: string): Promise<void> {
    const quotation = await this.findOne(id);
    quotation.isDeleted = true;
    await this.repo.save(quotation);
  }

  async uploadFile(id: string, file: Express.Multer.File): Promise<VendorQuotation> {
    const quotation = await this.findOne(id);
    quotation.quotationUrl = `/uploads/vendor-quotations/${file.filename}`;
    quotation.quotationKey = file.filename;
    return this.repo.save(quotation);
  }
}
