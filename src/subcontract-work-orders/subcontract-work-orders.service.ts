import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcontractWorkOrder } from './entities/subcontract-work-order.entity.js';
import { CreateSubcontractWorkOrderDto } from './dto/create-subcontract-work-order.dto.js';
import { UpdateSubcontractWorkOrderDto } from './dto/update-subcontract-work-order.dto.js';

@Injectable()
export class SubcontractWorkOrdersService {
  constructor(
    @InjectRepository(SubcontractWorkOrder)
    private readonly repository: Repository<SubcontractWorkOrder>,
  ) {}

  private calculateTotals(
    dto: CreateSubcontractWorkOrderDto | UpdateSubcontractWorkOrderDto,
    entity: SubcontractWorkOrder,
  ) {
    const quantity =
      dto.quantity !== undefined ? dto.quantity : entity.quantity;
    const rate = dto.rate !== undefined ? dto.rate : entity.rate;
    const gstPercentage =
      dto.gstPercentage !== undefined
        ? dto.gstPercentage
        : entity.gstPercentage;

    entity.amount = Number(quantity) * Number(rate);
    entity.gstAmount = (entity.amount * Number(gstPercentage)) / 100;
    entity.totalAmount = entity.amount + entity.gstAmount;
  }

  async create(dto: CreateSubcontractWorkOrderDto) {
    const existing = await this.repository.findOne({
      where: { woNumber: dto.woNumber },
    });
    if (existing) {
      throw new ConflictException(
        `Work Order with number ${dto.woNumber} already exists`,
      );
    }

    const swo = this.repository.create(dto);
    this.calculateTotals(dto, swo);
    return await this.repository.save(swo);
  }

  async findAll(subcontractorId?: string) {
    return await this.repository.find({
      where: {
        isDeleted: false,
        ...(subcontractorId ? { subcontractorId } : {}),
      },
      relations: ['project', 'subcontractor', 'workCategory'],
      order: { woNumber: 'DESC' },
    });
  }

  async findOne(id: string) {
    const swo = await this.repository.findOne({
      where: { id, isDeleted: false },
    });
    if (!swo) {
      throw new NotFoundException(
        `Subcontract Work Order with ID ${id} not found`,
      );
    }
    return swo;
  }

  async update(id: string, dto: UpdateSubcontractWorkOrderDto) {
    const swo = await this.findOne(id);
    Object.assign(swo, dto);
    this.calculateTotals(dto, swo);
    return await this.repository.save(swo);
  }

  async updateStatus(id: string, status: string) {
    const swo = await this.findOne(id);
    swo.status = status as any;
    return await this.repository.save(swo);
  }

  async remove(id: string) {
    const swo = await this.findOne(id);
    swo.isDeleted = true;
    return await this.repository.save(swo);
  }
}
