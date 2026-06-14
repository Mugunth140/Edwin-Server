import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyLabourReport } from './entities/daily-labour-report.entity.js';
import { DailyWorker } from './entities/daily-worker.entity.js';
import { CreateDailyLabourReportDto } from './dto/create-daily-labour.dto.js';

@Injectable()
export class DailyLabourService {
  constructor(
    @InjectRepository(DailyLabourReport)
    private readonly reportRepo: Repository<DailyLabourReport>,
    @InjectRepository(DailyWorker)
    private readonly workerRepo: Repository<DailyWorker>,
  ) {}

  async create(dto: CreateDailyLabourReportDto, userId: string, files?: any) {
    const report = this.reportRepo.create({
      projectId: dto.projectId,
      reportDate: new Date(dto.reportDate),
      remarks: dto.remarks,
      createdById: userId,
    });

    if (files) {
      if (files.morningPhoto1) report.morningPhoto1Url = `/uploads/dpw/${files.morningPhoto1[0].filename}`;
      if (files.morningPhoto2) report.morningPhoto2Url = `/uploads/dpw/${files.morningPhoto2[0].filename}`;
      if (files.eveningPhoto1) report.eveningPhoto1Url = `/uploads/dpw/${files.eveningPhoto1[0].filename}`;
      if (files.eveningPhoto2) report.eveningPhoto2Url = `/uploads/dpw/${files.eveningPhoto2[0].filename}`;
    }

    // Save report first to get ID
    const savedReport = await this.reportRepo.save(report);

    // Create and save workers
    if (dto.workers && dto.workers.length > 0) {
      const workers = dto.workers.map(w => this.workerRepo.create({
        ...w,
        reportId: savedReport.id
      }));
      await this.workerRepo.save(workers);
    }

    return this.findOne(savedReport.id);
  }

  async findAll(projectId?: string) {
    const query = this.reportRepo.createQueryBuilder('report')
      .leftJoinAndSelect('report.project', 'project')
      .leftJoinAndSelect('report.createdBy', 'createdBy')
      .leftJoinAndSelect('report.workers', 'workers')
      .leftJoinAndSelect('workers.tradeRel', 'tradeRel')
      .where('report.isDeleted = false');

    if (projectId) {
      query.andWhere('report.projectId = :projectId', { projectId });
    }

    query.orderBy('report.reportDate', 'DESC');
    
    return await query.getMany();
  }

  async findOne(id: string) {
    const report = await this.reportRepo.findOne({
      where: { id, isDeleted: false },
      relations: ['project', 'createdBy', 'workers', 'workers.tradeRel'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async remove(id: string) {
    const report = await this.reportRepo.findOne({
      where: { id, isDeleted: false },
    });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    await this.reportRepo.update(id, { isDeleted: true });
    return { success: true };
  }

  async update(id: string, dto: CreateDailyLabourReportDto, files?: any) {
    const report = await this.findOne(id);

    report.projectId = dto.projectId;
    report.reportDate = new Date(dto.reportDate);
    report.remarks = dto.remarks || '';

    if (files) {
      if (files.morningPhoto1) report.morningPhoto1Url = `/uploads/dpw/${files.morningPhoto1[0].filename}`;
      if (files.morningPhoto2) report.morningPhoto2Url = `/uploads/dpw/${files.morningPhoto2[0].filename}`;
      if (files.eveningPhoto1) report.eveningPhoto1Url = `/uploads/dpw/${files.eveningPhoto1[0].filename}`;
      if (files.eveningPhoto2) report.eveningPhoto2Url = `/uploads/dpw/${files.eveningPhoto2[0].filename}`;
    }

    await this.reportRepo.save(report);

    // Delete existing workers and create new ones
    await this.workerRepo.delete({ reportId: id });

    if (dto.workers && dto.workers.length > 0) {
      const workers = dto.workers.map(w => this.workerRepo.create({
        ...w,
        reportId: id
      }));
      await this.workerRepo.save(workers);
    }

    return this.findOne(id);
  }
}
