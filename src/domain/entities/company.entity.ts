import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity()
export default class Company extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;
}
