import { IFormCommand } from '../interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { InputCommand } from '../enums';
export class CommandInputState implements IFormCommand {
    public inputName: string;
    public inputState: InputCommand;

    constructor(inputName: string, inputState: InputCommand) {
        this.inputName = inputName;
        this.inputState = inputState;
    }

    public execute(formGroup: FormGroup) {
        const campoForm = formGroup.get(this.inputName) as FormControl;
        if (campoForm) {
            if (this.inputState === InputCommand.Enabled) {
                campoForm.enable();
            } else {
                campoForm.disable();
            }
        }
    }
}
