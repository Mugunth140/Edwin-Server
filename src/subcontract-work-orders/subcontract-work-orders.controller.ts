import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { SubcontractWorkOrdersService } from './subcontract-work-orders.service.js';
import { CreateSubcontractWorkOrderDto } from './dto/create-subcontract-work-order.dto.js';
import { UpdateSubcontractWorkOrderDto, UpdateSubcontractWorkOrderStatusDto } from './dto/update-subcontract-work-order.dto.js';

@ApiTags('Subcontract Work Orders')
@Controller({ path: 'subcontract-work-orders', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class SubcontractWorkOrdersController {
  constructor(private readonly subcontractWorkOrdersService: SubcontractWorkOrdersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Create a new subcontract work order' })
  create(@Body() dto: CreateSubcontractWorkOrderDto) {
    return this.subcontractWorkOrdersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all subcontract work orders' })
  @ApiQuery({ name: 'subcontractorId', required: false })
  findAll(@Query('subcontractorId') subcontractorId?: string) {
    return this.subcontractWorkOrdersService.findAll(subcontractorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subcontract work order by ID' })
  findOne(@Param('id') id: string) {
    return this.subcontractWorkOrdersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Update a subcontract work order' })
  update(@Param('id') id: string, @Body() dto: UpdateSubcontractWorkOrderDto) {
    return this.subcontractWorkOrdersService.update(id, dto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Update a subcontract work order status' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSubcontractWorkOrderStatusDto) {
    return this.subcontractWorkOrdersService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a subcontract work order' })
  remove(@Param('id') id: string) {
    return this.subcontractWorkOrdersService.remove(id);
  }
}
