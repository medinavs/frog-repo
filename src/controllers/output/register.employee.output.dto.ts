import CreateEmployeeUseCaseOutput from 'src/usecases/employee/output/register.employee.usecase.output';

export default class RegisterEmployeeOutputDto {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public birthdate: Date,
    public city: string,
    public state: string,
    public companyId: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromUseCaseOutput(
    data: CreateEmployeeUseCaseOutput,
  ): RegisterEmployeeOutputDto {
    const {
      id,
      name,
      email,
      phone,
      birthdate,
      city,
      state,
      companyId,
      createdAt,
      updatedAt,
    } = data;

    return new RegisterEmployeeOutputDto(
      id,
      name,
      email,
      phone,
      birthdate,
      city,
      state,
      companyId,
      createdAt,
      updatedAt,
    );
  }
}
