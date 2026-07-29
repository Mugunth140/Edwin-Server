import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseEnquiry } from './entities/purchase-enquiry.entity.js';
import { CreatePurchaseEnquiryDto } from './dto/create-purchase-enquiry.dto.js';
import { Role } from '../common/enums.js';

@Injectable()
export class PurchaseEnquiriesService {
  constructor(
    @InjectRepository(PurchaseEnquiry)
    private repo: Repository<PurchaseEnquiry>,
  ) {}

  private async generateEnquiryNo(): Promise<string> {
    const year = new Date().getFullYear();
    const last = await this.repo
      .createQueryBuilder('pe')
      .where('pe.enquiryNo LIKE :prefix', { prefix: `MR-${year}-%` })
      .orderBy('pe.enquiryNo', 'DESC')
      .getOne();
    let seq = 1;
    if (last) {
      const parts = last.enquiryNo.split('-');
      seq = parseInt(parts[2], 10) + 1;
    }
    return `MR-${year}-${String(seq).padStart(3, '0')}`;
  }

  async create(dto: CreatePurchaseEnquiryDto, userId?: string): Promise<PurchaseEnquiry> {
    const enquiryNo = await this.generateEnquiryNo();
    const enquiry = this.repo.create({
      enquiryNo,
      vendorId: dto.vendorId,
      projectId: dto.projectId,
      notes: dto.notes,
      items: dto.items,
      status: 'pending',
      createdBy: userId,
    });
    return this.repo.save(enquiry);
  }

  async findAll(user?: any) {
    const where: any = { isDeleted: false };

    if (user?.role === Role.SITE_ENGINEER) {
      where.createdBy = user.id;
    }

    return this.repo.find({
      where,
      relations: ['vendor', 'project', 'creator'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const enquiry = await this.repo.findOne({
      where: { id, isDeleted: false },
      relations: ['vendor', 'project', 'creator'],
    });
    if (!enquiry) throw new NotFoundException('Material Requirement not found');
    return enquiry;
  }

  async update(id: string, dto: CreatePurchaseEnquiryDto, userId?: string): Promise<PurchaseEnquiry> {
    const enquiry = await this.findOne(id);
    Object.assign(enquiry, {
      vendorId: dto.vendorId,
      projectId: dto.projectId,
      notes: dto.notes,
      items: dto.items,
      updatedBy: userId ?? '',
    });
    return this.repo.save(enquiry);
  }

  async updateStatus(id: string, status: string): Promise<PurchaseEnquiry> {
    const enquiry = await this.findOne(id);
    enquiry.status = status;
    return this.repo.save(enquiry);
  }

  async remove(id: string): Promise<void> {
    const enquiry = await this.findOne(id);
    enquiry.isDeleted = true;
    await this.repo.save(enquiry);
  }
}
