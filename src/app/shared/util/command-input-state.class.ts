import { IFormCommand } from '../interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { InputCommand } from '../enums';
export class CommandInputState implements IFormCommand {
    private formGroupIntance: FormGroup;
    private controlName: string;
    private inputState: InputCommand;

    constructor(formGroupIntance: FormGroup, controlName: string, inputState: InputCommand) {
        this.formGroupIntance = formGroupIntance;
        this.controlName = controlName;
        this.inputState = inputState;
    }

    public execute() {
        const formControl = this.formGroupIntance.get(this.controlName) as FormControl;
        if (formControl) {
            if (this.inputState === InputCommand.Enabled) {
                formControl.enable();
            } else {
                formControl.disable();
            }
        }
    }
}
