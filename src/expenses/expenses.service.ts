import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ExpenseCategory } from '../common/enums.js';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepo: Repository<Expense>,
  ) {}

  async create(dto: CreateExpenseDto, userId?: string): Promise<Expense> {
    const expense = this.expensesRepo.create({ ...dto, createdBy: userId });
    return this.expensesRepo.save(expense);
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
