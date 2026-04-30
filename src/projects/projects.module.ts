import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller.js';
import { ProjectsService } from './projects.service.js';
import { Project } from './entities/project.entity.js';
import { ProjectProgress } from './entities/project-progress.entity.js';
import { ProjectMilestone } from './entities/project-milestone.entity.js';
import { ChangeOrder } from './entities/change-order.entity.js';
import { AttendanceLog } from './entities/attendance-log.entity.js';
import { MachineryLog } from './entities/machinery-log.entity.js';
import { SnagItem } from './entities/snag-item.entity.js';
import { SafetyIncident } from './entities/safety-incident.entity.js';
import { Rfi } from './entities/rfi.entity.js';
import { SitePhoto } from './entities/site-photo.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectProgress,
      ProjectMilestone,
      ChangeOrder,
      AttendanceLog,
      MachineryLog,
      SnagItem,
      SafetyIncident,
      Rfi,
      SitePhoto,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
