import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DailyLabourReport } from './daily-labour-report.entity.js';
import { Trade } from '../../trades/entities/trade.entity.js';

@Entity('daily_workers')
export class DailyWorker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DailyLabourReport, report => report.workers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reportId' })
  report: DailyLabourReport;

  @Column()
  reportId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => Trade, { nullable: true })
  @JoinColumn({ name: 'tradeId' })
  tradeRel: Trade;

  @Column({ nullable: true })
  tradeId: string;

  @Column()
  trade: string;

  @Column({ type: 'time', nullable: true })
  inTime: string;

  @Column({ type: 'time', nullable: true })
  outTime: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;
}
