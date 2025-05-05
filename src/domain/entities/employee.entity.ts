import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import Company from './company.entity';

@Entity()
export default class Employee extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  birthdate: Date;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  companyId: number;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
