import GetEmployeesUseCaseOutput from 'src/usecases/company/output/get.company.employees.usecase.output';

export default class GetEmployeesOutputDto {
  employees: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    birthdate: Date;
    city: string;
    state: string;
  }>;

  static fromUseCaseOutput(
    output: GetEmployeesUseCaseOutput,
  ): GetEmployeesOutputDto {
    const dto = new GetEmployeesOutputDto();
    dto.employees = output.employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      birthdate: employee.birthdate,
      city: employee.city,
      state: employee.state,
    }));
    return dto;
  }
}
