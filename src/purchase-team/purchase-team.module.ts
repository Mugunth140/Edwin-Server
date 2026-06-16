import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity.js';
import { Project } from '../projects/entities/project.entity.js';
import { PurchaseTeamService } from './purchase-team.service.js';
import { PurchaseTeamController } from './purchase-team.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project])],
  controllers: [PurchaseTeamController],
  providers: [PurchaseTeamService],
  exports: [PurchaseTeamService],
})
export class PurchaseTeamModule {}
