import Employee from 'src/domain/entities/employee.entity';

export default class GetEmployeesUseCaseOutput {
  constructor(public readonly employees: Employee[]) {}
}
