import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { PurchaseOrdersService } from './purchase-orders.service.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';

@ApiTags('Purchase Orders')
@Controller({ path: 'purchase-orders', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class PurchaseOrdersController {
  constructor(private readonly poService: PurchaseOrdersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Create a new purchase order' })
  create(@Body() dto: CreatePurchaseOrderDto, @Request() req: any) {
    return this.poService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List purchase orders' })
  findAll() { return this.poService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get single purchase order' })
  findOne(@Param('id') id: string) { return this.poService.findOne(id); }
}
