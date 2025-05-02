import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import CreateCompanyUseCaseInput from 'src/usecases/company/input/create.company.usecase.input';

export default class CreateCompanyInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  @IsNumberString()
  cnpj: string;

  toUseCaseInput(): CreateCompanyUseCaseInput {
    return new CreateCompanyUseCaseInput(this.name, this.email, this.cnpj);
  }
}
