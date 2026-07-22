import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { SalariesService } from './salaries.service.js';
import { CreateSalaryDto } from './dto/create-salary.dto.js';
import { UpdateSalaryDto } from './dto/update-salary.dto.js';

@ApiTags('Salaries')
@Controller({ path: 'salaries', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new salary record' })
  create(@Body() dto: CreateSalaryDto) {
    return this.salariesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all salary records' })
  findAll() {
    return this.salariesService.findAll();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a salary record' })
  update(@Param('id') id: string, @Body() dto: UpdateSalaryDto) {
    return this.salariesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a salary record' })
  remove(@Param('id') id: string) {
    return this.salariesService.remove(id);
  }
}
