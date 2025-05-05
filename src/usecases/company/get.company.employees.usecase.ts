import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import {
  CompanyRepositoryToken,
  EmployeeRepositoryToken,
} from 'src/app.tokens';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';
import GetEmployeesUseCaseInput from './input/get.company.employees.usecase.input';
import GetEmployeesUseCaseOutput from './output/get.company.employees.usecase.output';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

@Injectable()
export default class GetEmployeesUseCase
  implements IUseCase<GetEmployeesUseCaseInput, GetEmployeesUseCaseOutput>
{
  constructor(
    @Inject(EmployeeRepositoryToken)
    private employeeRepository: IEmployeeRepository,

    @Inject(CompanyRepositoryToken)
    private companyRepository: ICompanyRepository,
  ) {}

  async run(
    input: GetEmployeesUseCaseInput,
  ): Promise<GetEmployeesUseCaseOutput> {
    const companyExists = await this.employeeRepository.findOne({
      companyId: input.companyId,
    });

    if (!companyExists) {
      throw new BadRequestException('Company does not exist');
    }

    const employees = await this.employeeRepository.findByCompanyId(
      input.companyId,
    );
    return new GetEmployeesUseCaseOutput(employees);
  }
}
