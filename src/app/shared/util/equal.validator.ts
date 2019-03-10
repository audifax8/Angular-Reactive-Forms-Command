import { AbstractControl, ValidatorFn } from '@angular/forms';

export class EqualValidator {
  static validate(controlSourceName: string, controlTargetName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const controlSourceValue = formGroup.get(controlSourceName).value;
      const controlTargetValue = formGroup.get(controlTargetName).value;
      if (controlSourceValue !== controlTargetValue) {
        return { noEqual: true };
      }
      return null;
    };
  }
}
