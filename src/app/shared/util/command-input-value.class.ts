import { IFormCommand } from '../interfaces';
import { FormGroup, FormControl } from '@angular/forms';
export class CommandInputValue implements IFormCommand {
    private formGroupIntance: FormGroup;
    private controlName: string;
    private inputValue: any;

    constructor(formGroupIntance: FormGroup, controlName: string, inputValue: any) {
        this.formGroupIntance = formGroupIntance;
        this.controlName = controlName;
        this.inputValue = inputValue;
    }

    public execute() {
        const inputForm = this.formGroupIntance.get(this.controlName) as FormControl;
        if (inputForm) {
            inputForm.setValue(this.inputValue);
        }
    }
}
