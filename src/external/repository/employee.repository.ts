import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import Employee from 'src/domain/entities/employee.entity';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';

@Injectable()
export default class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private repository: Repository<Employee>,
  ) {}

  async findOne(data: Partial<Employee>): Promise<Employee | null> {
    return await this.repository.findOne({ where: { ...data } });
  }

  async create(data: Partial<Employee>): Promise<Employee> {
    const Employee = this.repository.create(data);
    return await this.repository.save(Employee);
  }

  async findById(id: number): Promise<Employee | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByCompanyId(companyId: number): Promise<Employee[]> {
    return await this.repository.find({ where: { companyId } });
  }

  async findAll(): Promise<Employee[]> {
    return await this.repository.find();
  }

  async update(id: number, data: Partial<Employee>): Promise<Employee | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
