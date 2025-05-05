import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from './domain/entities/company.entity';
import {
  CompanyRepositoryToken,
  CreateCompanyUseCaseToken,
  EmployeeRepositoryToken,
  GetEmployeesUseCaseToken,
  RegisterEmployeeUseCaseToken,
} from './app.tokens';
import CreateCompanyUseCase from './usecases/company/create.company.usecase';
import CompanyRepository from './external/repository/company.repository';
import { EmployeeController } from './controllers/employee.controller';
import CreateEmployeeUseCase from './usecases/employee/register.employee.usecase';
import EmployeeRepository from './external/repository/employee.repository';
import GetEmployeesUseCase from './usecases/company/get.company.employees.usecase';
import Employee from './domain/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [Company, Employee],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Company, Employee]),
  ],
  controllers: [CompanyController, EmployeeController],
  providers: [
    // Use Cases
    {
      provide: CreateCompanyUseCaseToken,
      useClass: CreateCompanyUseCase,
    },
    {
      provide: RegisterEmployeeUseCaseToken,
      useClass: CreateEmployeeUseCase,
    },
    {
      provide: GetEmployeesUseCaseToken,
      useClass: GetEmployeesUseCase,
    },

    // Repositories
    {
      provide: CompanyRepositoryToken,
      useClass: CompanyRepository,
    },
    {
      provide: EmployeeRepositoryToken,
      useClass: EmployeeRepository,
    },
  ],
})
export class AppModule {}
