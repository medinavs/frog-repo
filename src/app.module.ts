import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from './domain/entities/company.entity';
import {
  CompanyRepositoryToken,
  CreateCompanyUseCaseToken,
} from './app.tokens';
import CreateCompanyUseCase from './usecases/company/create.company.usecase';
import CompanyRepository from './external/repository/company.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [Company],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompanyController],
  providers: [
    // Use Cases
    {
      provide: CreateCompanyUseCaseToken,
      useClass: CreateCompanyUseCase,
    },

    // Repositories

    {
      provide: CompanyRepositoryToken,
      useClass: CompanyRepository,
    },
  ],
})
export class AppModule {}
