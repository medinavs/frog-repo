export default class RegisterEmployeeUseCaseInput {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly birthdate: Date,
    readonly city: string,
    readonly state: string,
    readonly companyId: number,
  ) {}
}
