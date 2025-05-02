import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateCompanyUseCaseToken } from 'src/app.tokens';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateCompanyUseCaseInput from 'src/usecases/company/input/create.company.usecase.input';
import CreateCompanyUseCaseOutput from 'src/usecases/company/output/create.company.usecase.output';
import CreateCompanyInputDto from './input/create.company.input.dto';
import CreateCompanyOutputDto from './output/create.company.output.dto';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(CreateCompanyUseCaseToken)
    private readonly createCompanyUseCase: IUseCase<
      CreateCompanyUseCaseInput,
      CreateCompanyUseCaseOutput
    >,
  ) {}

  @Post()
  async createCompany(
    @Body() input: CreateCompanyInputDto,
  ): Promise<CreateCompanyOutputDto> {
    const useCaseInput = input.toUseCaseInput();
    const useCaseOutput = await this.createCompanyUseCase.run(useCaseInput);
    return CreateCompanyOutputDto.fromUseCaseOutput(useCaseOutput);
  }
}
