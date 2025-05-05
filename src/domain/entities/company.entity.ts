import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import Employee from './employee.entity';

@Entity()
export default class Company extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}
