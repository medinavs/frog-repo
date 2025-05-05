import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import CreateEmployeeUseCaseInput from 'src/usecases/employee/input/register.employee.usecase.input';
import { IsAtLeast18YearsOld } from 'src/core/decorators/age.validate';

export default class CreateEmployeeInputDto {
  @IsString()
  @IsNotEmpty({ message: 'nome é obrigatório' })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'email inválido' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'telefone é obrigatório' })
  @Matches(/^\d{10,11}$|^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
    message:
      'telefone deve ter 10-11 dígitos ou estar no formato (XX) XXXXX-XXXX',
  })
  phone: string;

  @IsNotEmpty({ message: 'data de nascimento é obrigatória' })
  @IsAtLeast18YearsOld({ message: 'funcionário deve ter no mínimo 18 anos' })
  @Type(() => Date)
  birthdate: Date;

  @IsString()
  @IsNotEmpty({ message: 'cidade é obrigatória' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'estado é obrigatório' })
  @Matches(/^[A-Z]{2}$/, {
    message: 'estado deve estar no formato de duas letras (ex: SP)',
  })
  state: string;

  @IsNotEmpty({ message: 'ID da empresa é obrigatório' })
  companyId: number;

  toUseCaseInput(): CreateEmployeeUseCaseInput {
    return new CreateEmployeeUseCaseInput(
      this.name,
      this.email,
      this.phone,
      this.birthdate,
      this.city,
      this.state,
      this.companyId,
    );
  }
}
