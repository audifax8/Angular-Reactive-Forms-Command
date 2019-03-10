import { IFormCommand } from '../interfaces';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
export class CommandValidationRule implements IFormCommand {
    private formGroupIntance: FormGroup;
    private controlName: string;
    private validationRules: ValidatorFn[];

    constructor(formGroupIntance: FormGroup, controlName: string, validationRules: ValidatorFn[]) {
        this.formGroupIntance = formGroupIntance;
        this.controlName = controlName;
        this.validationRules = validationRules;
    }

    public execute() {
        const inputForm = this.formGroupIntance.get(this.controlName) as FormControl;
        if (inputForm) {
            if (this.validationRules) {
                inputForm.setValidators(this.validationRules);
            } else {
                inputForm.clearValidators();
            }
        }
    }
}
