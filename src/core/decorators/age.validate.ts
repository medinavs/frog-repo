import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAtLeast18YearsOld', async: false })
export class IsAtLeast18YearsOldConstraint
  implements ValidatorConstraintInterface
{
  validate(date: string) {
    if (!date) return false;

    try {
      const birthDate = new Date(date);
      if (isNaN(birthDate.getTime())) return false;

      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 18);

      return birthDate <= minDate;
    } catch (e) {
      return false;
    }
  }

  defaultMessage() {
    return 'funcionário deve ter no mínimo 18 anos';
  }
}

export function IsAtLeast18YearsOld(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAtLeast18YearsOld',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAtLeast18YearsOldConstraint,
    });
  };
}
