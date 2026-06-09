import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentType, BillStatus, ExpenseCategory, PaymentMode } from '../common/enums.js';
import { PurchaseBill } from '../accounts/entities/purchase-bill.entity.js';
import { Expense } from '../expenses/entities/expense.entity.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
    @InjectRepository(PurchaseBill) private billRepo: Repository<PurchaseBill>,
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    private dataSource: DataSource,
  ) {}

  async create(dto: CreatePaymentDto, userId?: string): Promise<Payment> {
    return await this.dataSource.transaction(async (manager) => {
      let projectId = dto.projectId;
      let vendorId = dto.vendorId;

      if (dto.purchaseBillId) {
        const bill = await manager.findOne(PurchaseBill, {
          where: { id: dto.purchaseBillId },
        });
        if (!bill) throw new NotFoundException('Purchase Bill not found');

        projectId = bill.projectId;
        vendorId = bill.vendorId;

        // Update bill status and amount
        const newPaidAmount = Number(bill.paidAmount) + Number(dto.amount);
        bill.paidAmount = newPaidAmount;

        if (newPaidAmount >= Number(bill.amount)) {
          bill.status = BillStatus.PAID;
          bill.paidAt = new Date();
        } else if (newPaidAmount > 0) {
          bill.status = BillStatus.PARTIAL;
        }

        await manager.save(bill);
      }

      const payment = manager.create(Payment, {
        ...dto,
        projectId,
        vendorId,
        createdBy: userId,
      });

      return await manager.save(payment);
    });
  }

  async findAll(query: { type?: PaymentType; projectId?: string; dateFrom?: string; dateTo?: string; page?: number; limit?: number }) {
    const { type, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
    const qb = this.paymentsRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.project', 'project')
      .leftJoinAndSelect('p.vendor', 'vendor')
      .leftJoinAndSelect('p.expense', 'expense')
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

  async syncExpenses() {
    const expenses = await this.expenseRepo.find({ where: { isDeleted: false } });
    let count = 0;

    for (const exp of expenses) {
      const exists = await this.paymentsRepo.findOne({ where: { expenseId: exp.id } });
      if (!exists) {
        let pType = PaymentType.STAFF_EXPENSE;
        if (exp.category === ExpenseCategory.OFFICE) pType = PaymentType.OFFICE_MAINTENANCE;
        if (exp.category === ExpenseCategory.TRANSPORT) pType = PaymentType.TRANSPORT;
        if (exp.category === ExpenseCategory.TRAVEL) pType = PaymentType.TRAVEL;

        const payment = this.paymentsRepo.create({
          paymentType: pType,
          expenseId: exp.id,
          amount: exp.amount,
          paymentDate: exp.expenseDate,
          paymentMode: PaymentMode.CASH,
          payeeName: exp.paidBy || 'Staff',
          projectId: exp.projectId,
          notes: exp.description,
        });
        await this.paymentsRepo.save(payment);
        count++;
      }
    }
    return { success: true, syncedCount: count };
  }
}
