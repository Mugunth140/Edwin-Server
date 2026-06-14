import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity.js';
import { ProjectMilestone } from '../projects/entities/project-milestone.entity.js';
import { AttendanceLog } from '../projects/entities/attendance-log.entity.js';
import { SalesInvoice } from '../accounts/entities/sales-invoice.entity.js';
import { PurchaseBill } from '../accounts/entities/purchase-bill.entity.js';
import { Expense } from '../expenses/entities/expense.entity.js';
import { Payment } from '../payments/entities/payment.entity.js';
import { User } from '../users/entities/user.entity.js';
import { InvoiceStatus } from '../common/enums.js';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project) private projectsRepo: Repository<Project>,
    @InjectRepository(ProjectMilestone) private milestonesRepo: Repository<ProjectMilestone>,
    @InjectRepository(AttendanceLog) private attendanceRepo: Repository<AttendanceLog>,
    @InjectRepository(SalesInvoice) private invoiceRepo: Repository<SalesInvoice>,
    @InjectRepository(PurchaseBill) private billRepo: Repository<PurchaseBill>,
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async getMasterDashboard() {
    const projects = await this.projectsRepo.find({ where: { isDeleted: false } });
    const totalProjects = projects.length;

    // Revenue vs Cost
    const revenueResult = await this.invoiceRepo
      .createQueryBuilder('inv')
      .select('SUM(inv.totalAmount + inv.gstAmount)', 'total')
      .where('inv.isDeleted = false AND inv.status = :status', { status: InvoiceStatus.PAID })
      .getRawOne();

    const billCost = await this.billRepo
      .createQueryBuilder('bill')
      .select('SUM(bill.amount)', 'total')
      .where('bill.isDeleted = false')
      .getRawOne();

    const expenseCost = await this.expenseRepo
      .createQueryBuilder('e')
      .select('SUM(e.amount)', 'total')
      .where('e.isDeleted = false')
      .getRawOne();

    const paymentCost = await this.paymentRepo
      .createQueryBuilder('p')
      .select('SUM(p.amount)', 'total')
      .where('p.isDeleted = false')
      .getRawOne();

    const totalRevenue = Number(revenueResult?.total || 0);
    const totalCost = Number(billCost?.total || 0) + Number(expenseCost?.total || 0) + Number(paymentCost?.total || 0);

    // Weekly labour (last 8 weeks)
    const weeklyLabour = await this.attendanceRepo
      .createQueryBuilder('a')
      .select("DATE_TRUNC('week', a.logDate)", 'weekStart')
      .addSelect('SUM(a.headcount)', 'headcount')
      .groupBy("DATE_TRUNC('week', a.logDate)")
      .orderBy("DATE_TRUNC('week', a.logDate)", 'DESC')
      .limit(8)
      .getRawMany();

    return {
      totalProjects,
      projects: projects.map((p) => ({
        id: p.id,
        name: p.name,
        completionPct: Number(p.completionPct),
      })),
      revenueVsCost: { totalRevenue, totalCost },
      weeklyLabour: weeklyLabour.map((w) => ({
        weekStart: w.weekStart,
        headcount: Number(w.headcount),
      })),
      criticalActions: [],
    };
  }

  async getEngineerDashboard(userId: string) {
    const engineer = await this.usersRepo.findOne({
      where: { id: userId, isActive: true },
      relations: ['projects'],
    });

    if (!engineer) {
      throw new NotFoundException('Engineer not found');
    }

    const assignedProjects = engineer.projects || [];
    
    return {
      totalProjects: assignedProjects.length,
      projects: assignedProjects.map((p) => ({
        id: p.id,
        name: p.name,
        completionPct: Number(p.completionPct),
      })),
      revenueVsCost: { totalRevenue: 0, totalCost: 0 }, // Engineers don't see financial totals
      weeklyLabour: [],
      criticalActions: [],
    };
  }
}
