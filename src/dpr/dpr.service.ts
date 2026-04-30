import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DprReport } from './entities/dpr-report.entity.js';

@Injectable()
export class DprService {
  constructor(
    @InjectRepository(DprReport)
    private dprRepo: Repository<DprReport>,
  ) {}

  async create(data: Partial<DprReport>): Promise<DprReport> {
    const report = this.dprRepo.create(data);
    return this.dprRepo.save(report);
  }

  async findAll(query: { projectId?: string; dateFrom?: string; dateTo?: string; page?: number; limit?: number }) {
    const { projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
    const qb = this.dprRepo.createQueryBuilder('dpr')
      .leftJoinAndSelect('dpr.project', 'project')
      .where('dpr.isDeleted = false');

    if (projectId) qb.andWhere('dpr.projectId = :projectId', { projectId });
    if (dateFrom && dateTo) qb.andWhere('dpr.reportDate BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });

    qb.orderBy('dpr.reportDate', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<DprReport> {
    const report = await this.dprRepo.findOne({ where: { id, isDeleted: false }, relations: ['project'] });
    if (!report) throw new NotFoundException('DPR Report not found');
    return report;
  }

  async softDelete(id: string): Promise<void> {
    await this.dprRepo.update(id, { isDeleted: true });
  }
}
