import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './entities/salary.entity.js';
import { CreateSalaryDto } from './dto/create-salary.dto.js';

@Injectable()
export class SalariesService {
  constructor(
    @InjectRepository(Salary)
    private salariesRepository: Repository<Salary>,
  ) {}

  async create(dto: CreateSalaryDto): Promise<Salary> {
    const salary = this.salariesRepository.create(dto);
    return this.salariesRepository.save(salary);
  }

  async findAll(): Promise<Salary[]> {
    return this.salariesRepository.find({
      where: { isDeleted: false },
      order: { grades: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Salary> {
    const salary = await this.salariesRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!salary) throw new NotFoundException('Salary record not found');
    return salary;
  }

  async update(id: string, dto: any): Promise<Salary> {
    const salary = await this.findOne(id);
    Object.assign(salary, dto);
    return this.salariesRepository.save(salary);
  }

  async remove(id: string): Promise<void> {
    const salary = await this.findOne(id);
    salary.isDeleted = true;
    await this.salariesRepository.save(salary);
  }
}
