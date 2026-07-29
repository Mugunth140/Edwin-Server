import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyLabourReport } from './entities/daily-labour-report.entity.js';
import { DailyWorker } from './entities/daily-worker.entity.js';
import { CreateDailyLabourReportDto } from './dto/create-daily-labour.dto.js';
import { Role } from '../common/enums.js';

@Injectable()
export class DailyLabourService {
  constructor(
    @InjectRepository(DailyLabourReport)
    private readonly reportRepo: Repository<DailyLabourReport>,
    @InjectRepository(DailyWorker)
    private readonly workerRepo: Repository<DailyWorker>,
  ) {}

  async create(
    dto: CreateDailyLabourReportDto,
    userId: string,
    files?: Express.Multer.File[],
  ) {
    const report = this.reportRepo.create({
      projectId: dto.projectId,
      reportDate: new Date(dto.reportDate),
      remarks: dto.remarks,
      createdById: userId,
    });

    // Save report first to get ID
    const savedReport = await this.reportRepo.save(report);

    // Create and save workers
    if (dto.workers && dto.workers.length > 0) {
      const workers = dto.workers.map((w, index) => {
        const worker = this.workerRepo.create({
          ...w,
          reportId: savedReport.id,
        });

        if (files) {
          const m1 = files.find(
            (f) => f.fieldname === `worker_${index}_morningPhoto1`,
          );
          const m2 = files.find(
            (f) => f.fieldname === `worker_${index}_morningPhoto2`,
          );
          const e1 = files.find(
            (f) => f.fieldname === `worker_${index}_eveningPhoto1`,
          );
          const e2 = files.find(
            (f) => f.fieldname === `worker_${index}_eveningPhoto2`,
          );

          if (m1) worker.morningPhoto1Url = `/uploads/dpw/${m1.filename}`;
          if (m2) worker.morningPhoto2Url = `/uploads/dpw/${m2.filename}`;
          if (e1) worker.eveningPhoto1Url = `/uploads/dpw/${e1.filename}`;
          if (e2) worker.eveningPhoto2Url = `/uploads/dpw/${e2.filename}`;
        }

        return worker;
      });
      await this.workerRepo.save(workers);
    }

    return this.findOne(savedReport.id);
  }

  async findAll(user: any, projectId?: string) {
    const query = this.reportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.project', 'project')
      .leftJoinAndSelect('report.createdBy', 'createdBy')
      .leftJoinAndSelect('report.workers', 'workers')
      .leftJoinAndSelect('workers.tradeRel', 'tradeRel')
      .where('report.isDeleted = false');

    if (projectId) {
      query.andWhere('report.projectId = :projectId', { projectId });
    }

    // Site engineers only see their own reports
    if (user.role === Role.SITE_ENGINEER) {
      query.andWhere('report.createdById = :userId', { userId: user.id });
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

  async updateStatus(id: string, status: string) {
    const report = await this.findOne(id);
    report.status = status;
    return this.reportRepo.save(report);
  }

  async updateWorkerStatus(reportId: string, workerId: string, status: string) {
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    const worker = await this.workerRepo.findOne({
      where: { id: workerId, reportId },
    });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${workerId} not found in report ${reportId}`);
    }
    worker.status = status;
    return this.workerRepo.save(worker);
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

  async update(
    id: string,
    dto: CreateDailyLabourReportDto,
    files?: Express.Multer.File[],
  ) {
    const report = await this.findOne(id);

    report.projectId = dto.projectId;
    report.reportDate = new Date(dto.reportDate);
    report.remarks = dto.remarks || '';

    await this.reportRepo.save(report);

    // Delete existing workers and create new ones
    await this.workerRepo.delete({ reportId: id });

    if (dto.workers && dto.workers.length > 0) {
      const workers = dto.workers.map((w, index) => {
        const worker = this.workerRepo.create({
          ...w,
          reportId: id,
        });

        // Map photos from files if provided
        if (files) {
          const m1 = files.find(
            (f) => f.fieldname === `worker_${index}_morningPhoto1`,
          );
          const m2 = files.find(
            (f) => f.fieldname === `worker_${index}_morningPhoto2`,
          );
          const e1 = files.find(
            (f) => f.fieldname === `worker_${index}_eveningPhoto1`,
          );
          const e2 = files.find(
            (f) => f.fieldname === `worker_${index}_eveningPhoto2`,
          );

          if (m1) worker.morningPhoto1Url = `/uploads/dpw/${m1.filename}`;
          if (m2) worker.morningPhoto2Url = `/uploads/dpw/${m2.filename}`;
          if (e1) worker.eveningPhoto1Url = `/uploads/dpw/${e1.filename}`;
          if (e2) worker.eveningPhoto2Url = `/uploads/dpw/${e2.filename}`;
        }

        // If photo URLs were already in DTO (not replaced by new files), keep them
        if (!worker.morningPhoto1Url && w.morningPhoto1Url)
          worker.morningPhoto1Url = w.morningPhoto1Url;
        if (!worker.morningPhoto2Url && w.morningPhoto2Url)
          worker.morningPhoto2Url = w.morningPhoto2Url;
        if (!worker.eveningPhoto1Url && w.eveningPhoto1Url)
          worker.eveningPhoto1Url = w.eveningPhoto1Url;
        if (!worker.eveningPhoto2Url && w.eveningPhoto2Url)
          worker.eveningPhoto2Url = w.eveningPhoto2Url;

        return worker;
      });
      await this.workerRepo.save(workers);
    }

    return this.findOne(id);
  }
}
