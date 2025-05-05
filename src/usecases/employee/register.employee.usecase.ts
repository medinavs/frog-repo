import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CompanyRepositoryToken,
  EmployeeRepositoryToken,
} from 'src/app.tokens';
import RegisterEmployeeUseCaseInput from './input/register.employee.usecase.input';
import RegisterEmployeeUseCaseOutput from './output/register.employee.usecase.output';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

@Injectable()
export default class RegisterEmployeeUseCase
  implements
    IUseCase<RegisterEmployeeUseCaseInput, RegisterEmployeeUseCaseOutput>
{
  constructor(
    @Inject(CompanyRepositoryToken)
    private companyRepository: ICompanyRepository,

    @Inject(EmployeeRepositoryToken)
    private employeeRepository: IEmployeeRepository,
  ) {}

  async run(
    input: RegisterEmployeeUseCaseInput,
  ): Promise<RegisterEmployeeUseCaseOutput> {
    const companyExists = await this.companyRepository.findOne({
      id: input.companyId,
    });

    if (!companyExists) {
      throw new BadRequestException('Company does not exist');
    }

    return this.employeeRepository.create({
      ...input,
    });
  }
}
