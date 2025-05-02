export default class CreateCompanyUseCaseInput {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly cnpj: string,
  ) {}
}
