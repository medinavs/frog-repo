import CreateCompanyUseCaseOutput from 'src/usecases/company/output/create.company.usecase.output';

export default class CreateCompanyOutputDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly cnpj: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromUseCaseOutput(
    data: CreateCompanyUseCaseOutput,
  ): CreateCompanyOutputDto {
    return new CreateCompanyOutputDto(
      data.id,
      data.name,
      data.email,
      data.cnpj,
      data.createdAt,
      data.updatedAt,
    );
  }
}
