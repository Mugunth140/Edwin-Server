import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity.js';
import { PoItem } from './entities/po-item.entity.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder) private poRepo: Repository<PurchaseOrder>,
    @InjectRepository(PoItem) private poItemRepo: Repository<PoItem>,
  ) {}

  private async generatePoNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastPo = await this.poRepo
      .createQueryBuilder('po')
      .where('po.poNumber LIKE :prefix', { prefix: `PO-${year}-%` })
      .orderBy('po.poNumber', 'DESC')
      .getOne();
    let seq = 1;
    if (lastPo) {
      const parts = lastPo.poNumber.split('-');
      seq = parseInt(parts[2], 10) + 1;
    }
    return `PO-${year}-${String(seq).padStart(3, '0')}`;
  }

  async create(dto: CreatePurchaseOrderDto, userId?: string): Promise<PurchaseOrder> {
    const poNumber = await this.generatePoNumber();
    const items = dto.items.map((item) => {
      const amount = item.quantity * item.rate;
      return this.poItemRepo.create({ ...item, unit: item.unit || 'nos', amount });
    });
    const totalAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);
    const po = this.poRepo.create({
      poNumber, vendorId: dto.vendorId, projectId: dto.projectId,
      paymentTerms: dto.paymentTerms, totalAmount, items, createdBy: userId,
    });
    return this.poRepo.save(po);
  }

  async findAll() {
    return this.poRepo.find({ where: { isDeleted: false }, relations: ['vendor', 'items'], order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const po = await this.poRepo.findOne({ where: { id, isDeleted: false }, relations: ['vendor', 'items', 'project'] });
    if (!po) throw new NotFoundException('Purchase Order not found');
    return po;
  }
}
