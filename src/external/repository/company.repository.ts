import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Company from 'src/domain/entities/company.entity';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  async findOne(data: Partial<Company>): Promise<Company | null> {
    return await this.repository.findOne({ where: { ...data } });
  }

  async create(data: Partial<Company>): Promise<Company> {
    const company = this.repository.create(data);
    return await this.repository.save(company);
  }

  async findById(id: number): Promise<Company | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Company[]> {
    return await this.repository.find();
  }

  async update(id: number, data: Partial<Company>): Promise<Company | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
