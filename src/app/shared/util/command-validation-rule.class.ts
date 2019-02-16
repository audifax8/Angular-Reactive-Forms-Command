import { IFormCommand } from '../interfaces';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
export class CommandValidationRule implements IFormCommand {
    public inputName: string;
    public validationRules: ValidatorFn[];

    constructor(inputName: string, validationRules: ValidatorFn[]) {
        this.inputName = inputName;
        this.validationRules = validationRules;
    }

    public execute(formGroup: FormGroup) {
        const inputForm = formGroup.get(this.inputName) as FormControl;
        if (inputForm) {
            if (this.validationRules) {
                inputForm.setValidators(this.validationRules);
            } else {
                inputForm.clearValidators();
            }
        }
    }
}
