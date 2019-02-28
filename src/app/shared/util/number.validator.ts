import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValueType } from '../enums';

export class EqualValidator {
  static range(controlName: string, controlTargetName: string, valueType: ValueType): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      // if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
      //   return { 'range': true };
      // }
      return null;
    };
  }
}
