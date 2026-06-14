import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { ProjectProgress } from './entities/project-progress.entity.js';
import { ProjectMilestone } from './entities/project-milestone.entity.js';
import { ChangeOrder } from './entities/change-order.entity.js';
import { AttendanceLog } from './entities/attendance-log.entity.js';
import { MachineryLog } from './entities/machinery-log.entity.js';
import { SnagItem } from './entities/snag-item.entity.js';
import { SafetyIncident } from './entities/safety-incident.entity.js';
import { Rfi } from './entities/rfi.entity.js';
import { SitePhoto } from './entities/site-photo.entity.js';
import { CreateProjectDto } from './dto/create-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepo: Repository<Project>,
    @InjectRepository(ProjectProgress) private progressRepo: Repository<ProjectProgress>,
    @InjectRepository(ProjectMilestone) private milestonesRepo: Repository<ProjectMilestone>,
    @InjectRepository(ChangeOrder) private changeOrdersRepo: Repository<ChangeOrder>,
    @InjectRepository(AttendanceLog) private attendanceRepo: Repository<AttendanceLog>,
    @InjectRepository(MachineryLog) private machineryRepo: Repository<MachineryLog>,
    @InjectRepository(SnagItem) private snagsRepo: Repository<SnagItem>,
    @InjectRepository(SafetyIncident) private incidentsRepo: Repository<SafetyIncident>,
    @InjectRepository(Rfi) private rfisRepo: Repository<Rfi>,
    @InjectRepository(SitePhoto) private photosRepo: Repository<SitePhoto>,
  ) {}

  async create(dto: CreateProjectDto, userId?: string): Promise<Project> {
    const project = this.projectsRepo.create({ ...dto, createdBy: userId });
    return this.projectsRepo.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepo.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepo.findOne({ where: { id, isDeleted: false } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: any, userId?: string): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, { ...dto, updatedBy: userId });
    return this.projectsRepo.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    project.isDeleted = true;
    await this.projectsRepo.save(project);
  }

  async getDashboard(id: string) {
    const project = await this.findOne(id);

    const [progress, milestones, changeOrders, attendance, machinery, snags, incidents, rfis, photos] =
      await Promise.all([
        this.progressRepo.find({ where: { projectId: id }, order: { weekStartDate: 'DESC' } }),
        this.milestonesRepo.find({ where: { projectId: id }, order: { plannedDate: 'ASC' } }),
        this.changeOrdersRepo.find({ where: { projectId: id }, order: { date: 'DESC' } }),
        this.attendanceRepo.find({ where: { projectId: id }, order: { logDate: 'DESC' }, take: 30 }),
        this.machineryRepo.find({ where: { projectId: id }, order: { logDate: 'DESC' }, take: 30 }),
        this.snagsRepo.find({ where: { projectId: id }, order: { createdAt: 'DESC' } }),
        this.incidentsRepo.find({ where: { projectId: id }, order: { incidentDate: 'DESC' } }),
        this.rfisRepo.find({ where: { projectId: id }, order: { raisedDate: 'DESC' } }),
        this.photosRepo.find({ where: { projectId: id }, order: { weekDate: 'DESC' }, take: 20 }),
      ]);

    return {
      project,
      progress,
      milestones,
      changeOrders,
      attendance,
      machinery,
      snags,
      incidents,
      rfis,
      photos,
    };
  }

  // Sub-resource creation methods
  async addProgress(projectId: string, data: Partial<ProjectProgress>) {
    await this.findOne(projectId);
    const entry = this.progressRepo.create({ ...data, projectId });
    return this.progressRepo.save(entry);
  }

  async addMilestone(projectId: string, data: Partial<ProjectMilestone>) {
    await this.findOne(projectId);
    const entry = this.milestonesRepo.create({ ...data, projectId });
    return this.milestonesRepo.save(entry);
  }

  async updateMilestone(projectId: string, milestoneId: string, data: Partial<ProjectMilestone>) {
    await this.findOne(projectId);
    await this.milestonesRepo.update(milestoneId, data);
    return this.milestonesRepo.findOne({ where: { id: milestoneId } });
  }

  async addAttendance(projectId: string, data: Partial<AttendanceLog>) {
    await this.findOne(projectId);
    const entry = this.attendanceRepo.create({ ...data, projectId });
    return this.attendanceRepo.save(entry);
  }

  async addSnag(projectId: string, data: Partial<SnagItem>) {
    await this.findOne(projectId);
    const entry = this.snagsRepo.create({ ...data, projectId });
    return this.snagsRepo.save(entry);
  }

  async updateSnag(projectId: string, snagId: string, data: Partial<SnagItem>) {
    await this.findOne(projectId);
    await this.snagsRepo.update(snagId, data);
    return this.snagsRepo.findOne({ where: { id: snagId } });
  }

  async addRfi(projectId: string, data: Partial<Rfi>) {
    await this.findOne(projectId);
    const entry = this.rfisRepo.create({ ...data, projectId });
    return this.rfisRepo.save(entry);
  }

  async updateRfi(projectId: string, rfiId: string, data: Partial<Rfi>) {
    await this.findOne(projectId);
    await this.rfisRepo.update(rfiId, data);
    return this.rfisRepo.findOne({ where: { id: rfiId } });
  }

  async addIncident(projectId: string, data: Partial<SafetyIncident>) {
    await this.findOne(projectId);
    const entry = this.incidentsRepo.create({ ...data, projectId });
    return this.incidentsRepo.save(entry);
  }

  async addMachinery(projectId: string, data: Partial<MachineryLog>) {
    await this.findOne(projectId);
    const entry = this.machineryRepo.create({ ...data, projectId });
    return this.machineryRepo.save(entry);
  }

  async addChangeOrder(projectId: string, data: Partial<ChangeOrder>) {
    await this.findOne(projectId);
    const entry = this.changeOrdersRepo.create({ ...data, projectId });
    return this.changeOrdersRepo.save(entry);
  }
}
