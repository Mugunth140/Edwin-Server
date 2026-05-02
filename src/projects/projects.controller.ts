import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';

@ApiTags('Projects')
@Version('1')
@Controller('projects')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new project' })
  create(@Body() dto: CreateProjectDto, @Request() req: any) {
    return this.projectsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id/dashboard')
  @ApiOperation({ summary: 'Get full project dashboard data' })
  getDashboard(@Param('id') id: string) {
    return this.projectsService.getDashboard(id);
  }

  @Post(':id/progress')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Add weekly progress entry' })
  addProgress(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addProgress(id, body);
  }

  @Post(':id/milestones')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Add milestone' })
  addMilestone(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addMilestone(id, body);
  }

  @Patch(':id/milestones/:mid')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Update milestone status' })
  updateMilestone(@Param('id') id: string, @Param('mid') mid: string, @Body() body: any) {
    return this.projectsService.updateMilestone(id, mid, body);
  }

  @Post(':id/attendance')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Log attendance' })
  addAttendance(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addAttendance(id, body);
  }

  @Post(':id/snag')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Add snag item' })
  addSnag(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addSnag(id, body);
  }

  @Patch(':id/snag/:snagId')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Update snag status' })
  updateSnag(@Param('id') id: string, @Param('snagId') snagId: string, @Body() body: any) {
    return this.projectsService.updateSnag(id, snagId, body);
  }

  @Post(':id/rfi')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Raise RFI' })
  addRfi(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addRfi(id, body);
  }

  @Patch(':id/rfi/:rfiId')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Update RFI status' })
  updateRfi(@Param('id') id: string, @Param('rfiId') rfiId: string, @Body() body: any) {
    return this.projectsService.updateRfi(id, rfiId, body);
  }

  @Post(':id/incidents')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Record safety incident' })
  addIncident(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addIncident(id, body);
  }

  @Post(':id/machinery')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Log machinery usage' })
  addMachinery(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addMachinery(id, body);
  }

  @Post(':id/change-orders')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add change order' })
  addChangeOrder(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addChangeOrder(id, body);
  }
}
