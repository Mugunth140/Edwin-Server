import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WeeklyTimesheet } from './entities/weekly-timesheet.entity.js';
import { TimesheetRow } from './entities/timesheet-row.entity.js';
import { CreateTimesheetDto } from './dto/create-timesheet.dto.js';
import { Payment } from '../payments/entities/payment.entity.js';
import { User } from '../users/entities/user.entity.js';
import { PaymentType, PaymentMode, Role } from '../common/enums.js';

@Injectable()
export class TimesheetAttendanceService {
  constructor(
    @InjectRepository(WeeklyTimesheet)
    private tsRepo: Repository<WeeklyTimesheet>,
    @InjectRepository(TimesheetRow)
    private rowRepo: Repository<TimesheetRow>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  private calcWeekEnd(weekStart: string): string {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return end.toISOString().split('T')[0];
  }

  async create(dto: CreateTimesheetDto, siteEngineerId: string) {
    const weekEnd = this.calcWeekEnd(dto.weekStart);
    const ts = this.tsRepo.create({
      siteEngineerId,
      weekStart: new Date(dto.weekStart),
      weekEnd: new Date(weekEnd),
    });
    const saved = await this.tsRepo.save(ts);

    const rows = dto.rows.map((r) =>
      this.rowRepo.create({ ...r, timesheetId: saved.id }),
    );
    saved.rows = await this.rowRepo.save(rows);
    saved.totalHours = this.calcTotal(saved.rows);
    return this.tsRepo.save(saved);
  }

  async findByWeek(siteEngineerId: string, weekStart: string) {
    return this.tsRepo.findOne({
      where: {
        siteEngineerId,
        weekStart: new Date(weekStart),
        isDeleted: false,
      },
      relations: ['rows'],
    });
  }

  async findOne(id: string) {
    const ts = await this.tsRepo.findOne({
      where: { id, isDeleted: false },
      relations: ['rows'],
    });
    if (!ts) throw new NotFoundException('Timesheet not found');
    return this.attachSiteEngineer(ts);
  }

  async findAll(status?: string, page = 1, limit = 50) {
    const where: any = { isDeleted: false };
    if (status) where.status = status;
    const [data, total] = await this.tsRepo.findAndCount({
      where,
      relations: ['rows'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const enriched = await this.attachSiteEngineerMany(data);
    return { data: enriched, total, page, limit };
  }

  async update(id: string, dto: CreateTimesheetDto, userId: string) {
    const ts = await this.findOne(id);
    if (ts.siteEngineerId !== userId)
      throw new ForbiddenException('Not your timesheet');
    if (ts.status !== 'pending')
      throw new BadRequestException(
        'Cannot edit submitted/verified/approved timesheet',
      );

    await this.rowRepo.delete({ timesheetId: id });
    const rows = dto.rows.map((r) =>
      this.rowRepo.create({ ...r, timesheetId: id }),
    );
    ts.rows = await this.rowRepo.save(rows);
    ts.totalHours = this.calcTotal(ts.rows);
    return this.tsRepo.save(ts);
  }

  async submit(id: string, userId: string) {
    const ts = await this.findOne(id);
    if (ts.siteEngineerId !== userId)
      throw new ForbiddenException('Not your timesheet');
    if (ts.status !== 'pending')
      throw new BadRequestException('Timesheet already submitted or processed');
    ts.status = 'submitted';
    return this.tsRepo.save(ts);
  }

  async unsubmit(id: string, userId: string) {
    const ts = await this.findOne(id);
    if (ts.siteEngineerId !== userId)
      throw new ForbiddenException('Not your timesheet');
    if (ts.status !== 'submitted')
      throw new BadRequestException(
        'Only submitted timesheets can be reopened',
      );
    ts.status = 'pending';
    return this.tsRepo.save(ts);
  }

  async verify(id: string, userId: string) {
    const ts = await this.findOne(id);
    if (ts.status !== 'pending' && ts.status !== 'submitted')
      throw new BadRequestException(
        'Only pending/submitted timesheets can be verified',
      );
    ts.status = 'verified';
    ts.approvedById = userId;
    ts.approvedAt = new Date();
    return this.tsRepo.save(ts);
  }

  async approve(id: string, userId: string) {
    const ts = await this.findOne(id);
    if (ts.status !== 'verified')
      throw new BadRequestException('Only verified timesheets can be approved');

    const user = await this.userRepo.findOne({
      where: { id: ts.siteEngineerId },
      relations: ['salaryGrade'],
    });
    if (!user) throw new NotFoundException('Site engineer not found');
    if (!user.salaryGrade)
      throw new BadRequestException(
        'Site engineer has no salary grade assigned',
      );

    const avgCostPerHr = Number(user.salaryGrade.avgCostPerHr);

    let totalCost = 0;
    for (const row of ts.rows) {
      if (!row.projectId) continue;
      const rowHours =
        Number(row.monHours) +
        Number(row.tueHours) +
        Number(row.wedHours) +
        Number(row.thuHours) +
        Number(row.friHours) +
        Number(row.satHours) +
        Number(row.sunHours);
      const rowAmount = rowHours * avgCostPerHr;
      row.amount = rowAmount;
      totalCost += rowAmount;
    }
    await this.rowRepo.save(ts.rows);

    const weekLabel = new Date(ts.weekStart).toISOString().split('T')[0];
    const payment = this.paymentRepo.create({
      paymentType: PaymentType.LABOUR,
      amount: totalCost,
      paymentDate: new Date(),
      payeeName: user.name || user.email || 'Site Engineer',
      notes: `Timesheet ${weekLabel} - ${user.name || ''}`,
      projectId: ts.rows.find((r) => r.projectId)?.projectId ?? undefined,
      createdBy: userId,
      timesheetId: ts.id,
    });
    await this.paymentRepo.save(payment);

    ts.status = 'approved';
    ts.approvedById = userId;
    ts.approvedAt = new Date();
    return this.tsRepo.save(ts);
  }

  async reject(id: string, userId: string) {
    const ts = await this.findOne(id);
    if (ts.status === 'approved')
      throw new BadRequestException('Already approved');
    ts.status = 'rejected';
    ts.approvedById = userId;
    ts.approvedAt = new Date();
    return this.tsRepo.save(ts);
  }

  async remove(id: string, userId: string) {
    const ts = await this.findOne(id);
    if (ts.siteEngineerId !== userId)
      throw new ForbiddenException('Not your timesheet');
    ts.isDeleted = true;
    return this.tsRepo.save(ts);
  }

  private calcTotal(rows: TimesheetRow[]) {
    return rows.reduce((sum, r) => {
      return (
        sum +
        Number(r.monHours) +
        Number(r.tueHours) +
        Number(r.wedHours) +
        Number(r.thuHours) +
        Number(r.friHours) +
        Number(r.satHours) +
        Number(r.sunHours)
      );
    }, 0);
  }

  private async attachSiteEngineer(ts: WeeklyTimesheet) {
    if (ts.siteEngineerId) {
      const user = await this.userRepo.findOne({
        where: { id: ts.siteEngineerId },
        relations: ['salaryGrade'],
      });
      (ts as any).siteEngineer = user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            employeeId: user.employeeId,
            phone: user.phone,
            role: user.role,
            salaryGrade: user.salaryGrade,
          }
        : null;
    }
    return ts;
  }

  private async attachSiteEngineerMany(list: WeeklyTimesheet[]) {
    const ids = [...new Set(list.map((t) => t.siteEngineerId).filter(Boolean))];
    if (ids.length === 0) return list;
    const users = await this.userRepo.find({
      where: { id: In(ids) },
      relations: ['salaryGrade'],
    });
    const userMap = new Map(users.map((u) => [u.id, u]));
    for (const ts of list) {
      const user = userMap.get(ts.siteEngineerId);
      (ts as any).siteEngineer = user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            employeeId: user.employeeId,
            phone: user.phone,
            role: user.role,
            salaryGrade: user.salaryGrade,
          }
        : null;
    }
    return list;
  }
}
