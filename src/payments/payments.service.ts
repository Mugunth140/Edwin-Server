import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentType } from '../common/enums.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto, userId?: string): Promise<Payment> {
    const payment = this.paymentsRepo.create({ ...dto, createdBy: userId });
    return this.paymentsRepo.save(payment);
  }

  async findAll(query: { type?: PaymentType; projectId?: string; dateFrom?: string; dateTo?: string; page?: number; limit?: number }) {
    const { type, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
    const qb = this.paymentsRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.project', 'project')
      .where('p.isDeleted = false');
    if (type) qb.andWhere('p.paymentType = :type', { type });
    if (projectId) qb.andWhere('p.projectId = :projectId', { projectId });
    if (dateFrom && dateTo) qb.andWhere('p.paymentDate BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });
    qb.orderBy('p.paymentDate', 'DESC').skip((page - 1) * limit).take(limit);
    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async getSummary() {
    return this.paymentsRepo
      .createQueryBuilder('p')
      .select('p.paymentType', 'paymentType')
      .addSelect('SUM(p.amount)', 'total')
      .where('p.isDeleted = false')
      .groupBy('p.paymentType')
      .getRawMany();
  }
}
