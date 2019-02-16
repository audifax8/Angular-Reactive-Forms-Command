import { IFormCommand } from '../interfaces';
import { FormGroup, FormControl } from '@angular/forms';
export class CommandInputValue implements IFormCommand {
    public inputName: string;
    public inputValue: any;

    constructor(inputName: string, inputValue: any) {
        this.inputName = inputName;
        this.inputValue = inputValue;
    }

    public execute(formGroup: FormGroup) {
        const inputForm = formGroup.get(this.inputName) as FormControl;
        if (inputForm) {
            inputForm.setValue(this.inputValue);
        }
    }
}
