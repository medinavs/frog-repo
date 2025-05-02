import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateCompanyUseCaseInput from './input/create.company.usecase.input';
import CreateCompanyUseCaseOutput from './output/create.company.usecase.output';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CompanyRepositoryToken } from 'src/app.tokens';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

@Injectable()
export default class CreateCompanyUseCase
  implements IUseCase<CreateCompanyUseCaseInput, CreateCompanyUseCaseOutput>
{
  constructor(
    @Inject(CompanyRepositoryToken)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(
    input: CreateCompanyUseCaseInput,
  ): Promise<CreateCompanyUseCaseOutput> {
    const companyAlreadyExists = await this.companyRepository.findOne({
      cnpj: input.cnpj,
    });

    if (companyAlreadyExists) {
      throw new BadRequestException('Company already exists');
    }

    return this.companyRepository.create({
      ...input,
    });
  }
}
