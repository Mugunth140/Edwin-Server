import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Expense } from './entities/expense.entity.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ExpenseCategory, PaymentType, PaymentMode } from '../common/enums.js';
import { Payment } from '../payments/entities/payment.entity.js';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepo: Repository<Expense>,
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
    private dataSource: DataSource,
  ) {}

  async create(dto: CreateExpenseDto, userId?: string): Promise<Expense> {
    return await this.dataSource.transaction(async (manager) => {
      // 1. Create the Expense
      const expense = manager.create(Expense, { ...dto, createdBy: userId });
      const savedExpense = await manager.save(expense);

      // 2. Map ExpenseCategory to PaymentType
      let pType = PaymentType.STAFF_EXPENSE;
      if (dto.category === ExpenseCategory.OFFICE) pType = PaymentType.OFFICE_MAINTENANCE;
      if (dto.category === ExpenseCategory.TRANSPORT) pType = PaymentType.TRANSPORT;
      if (dto.category === ExpenseCategory.TRAVEL) pType = PaymentType.TRAVEL;

      // 3. Create the Payment record for the Master Ledger
      const payment = manager.create(Payment, {
        paymentType: pType,
        expenseId: savedExpense.id,
        amount: dto.amount,
        paymentDate: dto.expenseDate,
        paymentMode: PaymentMode.CASH, // Default for expenses, can be updated if needed
        payeeName: dto.paidBy || 'Staff',
        projectId: dto.projectId,
        notes: dto.description,
        createdBy: userId,
      });
      await manager.save(payment);

      return savedExpense;
    });
  }

  async findAll(query: { category?: ExpenseCategory; projectId?: string; dateFrom?: string; dateTo?: string; page?: number; limit?: number }) {
    const { category, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
    const qb = this.expensesRepo.createQueryBuilder('e')
      .leftJoinAndSelect('e.project', 'project')
      .where('e.isDeleted = false');
    if (category) qb.andWhere('e.category = :category', { category });
    if (projectId) qb.andWhere('e.projectId = :projectId', { projectId });
    if (dateFrom && dateTo) qb.andWhere('e.expenseDate BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });
    qb.orderBy('e.expenseDate', 'DESC').skip((page - 1) * limit).take(limit);
    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expensesRepo.findOne({
      where: { id, isDeleted: false },
      relations: ['project'],
    });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async update(id: string, dto: Partial<CreateExpenseDto>): Promise<Expense> {
    const expense = await this.findOne(id);
    Object.assign(expense, dto);
    return this.expensesRepo.save(expense);
  }

  async softDelete(id: string): Promise<void> {
    const expense = await this.findOne(id);
    expense.isDeleted = true;
    await this.expensesRepo.save(expense);
  }

  async getSummary() {
    const result = await this.expensesRepo
      .createQueryBuilder('e')
      .select('e.category', 'category')
      .addSelect('SUM(e.amount)', 'total')
      .where('e.isDeleted = false')
      .groupBy('e.category')
      .getRawMany();
    return result;
  }
}
