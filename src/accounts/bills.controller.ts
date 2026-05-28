import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { AccountsService } from './accounts.service.js';
import { CreateBillDto } from './dto/accounts.dto.js';

@ApiTags('Bills')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'bills', version: '1' })
export class BillsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Create purchase bill' })
  createBill(@Body() dto: CreateBillDto, @Request() req: any) {
    return this.accountsService.createBill(dto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'List bills' })
  findBills() {
    return this.accountsService.findBills();
  }

  @Post('../purchase-orders/:id/convert')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Convert PO to bill' })
  convertPoToBill(@Param('id') id: string, @Request() req: any) {
    return this.accountsService.convertPoToBill(id, req.user.id);
  }
}
