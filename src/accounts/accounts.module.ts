import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller.js';
import { InvoicesController } from './invoices.controller.js';
import { BillsController } from './bills.controller.js';
import { OtherAccountsController } from './other.controller.js';
import { AccountsService } from './accounts.service.js';
import { SalesInvoice } from './entities/sales-invoice.entity.js';
import { InvoiceItem } from './entities/invoice-item.entity.js';
import { PurchaseBill } from './entities/purchase-bill.entity.js';
import { BoqItem } from './entities/boq-item.entity.js';
import { Advance } from './entities/advance.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { PurchaseOrder } from '../purchase-orders/entities/purchase-order.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalesInvoice,
      InvoiceItem,
      PurchaseBill,
      BoqItem,
      Advance,
      Customer,
      PurchaseOrder,
    ]),
  ],
  controllers: [
    AccountsController,
    InvoicesController,
    BillsController,
    OtherAccountsController,
  ],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
