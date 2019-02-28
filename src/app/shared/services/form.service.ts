import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable()
export class FormService {

  constructor() {
  }

  public getInputValue(inputName: string, form: FormGroup): any {
    const inputFormControl = form.get(inputName) as FormControl;
    if (inputFormControl) {
      return inputFormControl.value;
    }
  }

  /**
   * it's used to mark an input as invalid.
   */
  public isTouchedOrDirtyAndInvalid(inputName: string, form: FormGroup): boolean {
    const inputFormControl = form.get(inputName) as FormControl;
    return !((inputFormControl.touched || inputFormControl.dirty) && inputFormControl.invalid);
  }

  /**
   * calls method updateValueAndValidity()
   */
  public updateValueAndValidity(formulario: FormGroup | FormArray): void {
    Object.keys(formulario.controls).forEach((field) => {
      const control = formulario.get(field);
      if ((control instanceof FormControl)) {
        control.updateValueAndValidity();
      } else if ((control instanceof FormArray) || (control instanceof FormGroup)) {
        this.updateValueAndValidity(control);
      }
    });
  }

  /**
   * calls method markAsTouched() y markAsDirty().
   */
  public markAsTouchedAndMarkAsDirty(form: FormGroup | FormArray): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if ((control instanceof FormControl)) {
        control.markAsTouched();
        control.markAsDirty();
      } else if ((control instanceof FormArray) || (control instanceof FormGroup)) {
        this.markAsTouchedAndMarkAsDirty(control);
      }
    });
  }

  /**
   * calls method reset()
   */
  public reset(form: FormGroup | FormArray): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if ((control instanceof FormControl)) {
        control.reset();
      } else if ((control instanceof FormArray) || (control instanceof FormGroup)) {
        this.reset(control);
      }
    });
  }

}
