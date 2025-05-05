import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  CreateCompanyUseCaseToken,
  GetEmployeesUseCaseToken,
} from 'src/app.tokens';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateCompanyUseCaseInput from 'src/usecases/company/input/create.company.usecase.input';
import CreateCompanyUseCaseOutput from 'src/usecases/company/output/create.company.usecase.output';
import CreateCompanyInputDto from './input/create.company.input.dto';
import CreateCompanyOutputDto from './output/create.company.output.dto';
import { ValidationPipe } from 'src/pipes/class-validator-pipe';
import GetEmployeesOutputDto from './output/get.company.employees.output.dto';
import GetEmployeesUseCaseInput from 'src/usecases/company/input/get.company.employees.usecase.input';
import GetEmployeesUseCaseOutput from 'src/usecases/company/output/get.company.employees.usecase.output';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(CreateCompanyUseCaseToken)
    private createCompanyUseCase: IUseCase<
      CreateCompanyUseCaseInput,
      CreateCompanyUseCaseOutput
    >,

    @Inject(GetEmployeesUseCaseToken)
    private getEmployeesUseCase: IUseCase<
      GetEmployeesUseCaseInput,
      GetEmployeesUseCaseOutput
    >,
  ) {}

  @Post()
  async createCompany(
    @Body(new ValidationPipe()) input: CreateCompanyInputDto,
  ): Promise<CreateCompanyOutputDto> {
    const useCaseInput = input.toUseCaseInput();
    const useCaseOutput = await this.createCompanyUseCase.run(useCaseInput);
    return CreateCompanyOutputDto.fromUseCaseOutput(useCaseOutput);
  }

  @Get(':companyId/employees')
  async getAllEmployees(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<GetEmployeesOutputDto> {
    const useCaseInput = new GetEmployeesUseCaseInput(companyId);
    const useCaseOutput = await this.getEmployeesUseCase.run(useCaseInput);
    return GetEmployeesOutputDto.fromUseCaseOutput(useCaseOutput);
  }
}
