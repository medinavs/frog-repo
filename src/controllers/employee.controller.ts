import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterEmployeeUseCaseToken } from 'src/app.tokens';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import { ValidationPipe } from 'src/pipes/class-validator-pipe';
import RegisterEmployeeUseCaseInput from 'src/usecases/employee/input/register.employee.usecase.input';
import RegisterEmployeeUseCaseOutput from 'src/usecases/employee/output/register.employee.usecase.output';
import CreateEmployeeInputDto from './input/create.employee.input.dto';
import CreateEmployeeOutputDto from './output/register.employee.output.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(RegisterEmployeeUseCaseToken)
    private readonly registerEmployeeUseCase: IUseCase<
      RegisterEmployeeUseCaseInput,
      RegisterEmployeeUseCaseOutput
    >,
  ) {}

  @Post()
  async registerEmployee(
    @Body(new ValidationPipe()) input: CreateEmployeeInputDto,
  ): Promise<CreateEmployeeOutputDto> {
    const useCaseInput = input.toUseCaseInput();
    const useCaseOutput = await this.registerEmployeeUseCase.run(useCaseInput);
    return CreateEmployeeOutputDto.fromUseCaseOutput(useCaseOutput);
  }
}
