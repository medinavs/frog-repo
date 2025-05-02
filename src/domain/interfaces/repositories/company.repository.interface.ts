import Company from 'src/domain/entities/company.entity';

export default interface ICompanyRepository {
  create(data: Partial<Company>): Promise<Company>;
  findById(id: number): Promise<Company | null>;
  findOne(data: Partial<Company>): Promise<Company | null>;
  findAll(): Promise<Company[]>;
  update(id: number, data: Partial<Company>): Promise<Company | null>;
  delete(id: number): Promise<void>;
}
