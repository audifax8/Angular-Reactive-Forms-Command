import { FormGroup, FormControl } from '@angular/forms';
import { LoginConstants } from '../../login/login.constants';
export class User {
    public userName: string;
    public password: string;
    /**
     *
     */
    constructor() {
    }
    public getFormInstance(): FormGroup {
        const loginForm = new FormGroup({});
        const userNameFormControl = new FormControl();
        const passwordFormControl = new FormControl();
        loginForm.addControl(LoginConstants.USER_NAME, userNameFormControl);
        loginForm.addControl(LoginConstants.PASSWORD, passwordFormControl);
        return loginForm;
    }
}
