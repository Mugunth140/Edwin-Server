import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { DashboardService } from './dashboard.service.js';

@ApiTags('Dashboard')
@Controller({ path: 'dashboard', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('master')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Get master dashboard KPIs' })
  getMaster() {
    return this.dashboardService.getMasterDashboard();
  }

  @Get('engineer')
  @Roles(Role.SITE_ENGINEER)
  @ApiOperation({ summary: 'Get engineer dashboard KPIs' })
  getEngineer(@Request() req: any) {
    return this.dashboardService.getEngineerDashboard(req.user.id);
  }
}
