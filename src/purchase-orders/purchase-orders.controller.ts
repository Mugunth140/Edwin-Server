import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { PurchaseOrdersService } from './purchase-orders.service.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';
import { UpdatePurchaseOrderStatusDto } from './dto/update-purchase-order-status.dto.js';

@ApiTags('Purchase Orders')
@Controller({ path: 'purchase-orders', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class PurchaseOrdersController {
  constructor(private readonly poService: PurchaseOrdersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Create a new purchase order' })
  create(@Body() dto: CreatePurchaseOrderDto, @Request() req: any) {
    return this.poService.create(dto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'List purchase orders' })
  findAll() { return this.poService.findAll(); }

  @Get(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Get single purchase order' })
  findOne(@Param('id') id: string) { return this.poService.findOne(id); }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Update purchase order status' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdatePurchaseOrderStatusDto) {
    return this.poService.updateStatus(id, dto.status);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Update purchase order' })
  update(@Param('id') id: string, @Body() dto: any, @Request() req: any) {
    return this.poService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER, Role.PURCHASE_TEAM)
  @ApiOperation({ summary: 'Delete purchase order' })
  remove(@Param('id') id: string) {
    return this.poService.remove(id);
  }
}
