import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginConstants } from './login.constants';
import { User } from '../shared/models';
import { CommandValidationRule } from '../shared/util';
import { FormService, CommandService } from '../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  user = new User();
  LoginConstants = LoginConstants;
  loginFormBuilderWay: FormGroup;

  userNameFormContolWay: FormControl;
  passwordFormControlWay: FormControl;

  loginFormCommandWay: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public formService: FormService,
    private commandService: CommandService
  ) { }

  ngOnInit() {
    this.loginFormCommandWay = this.user.getFormInstance();
    this.commandService.addCommand(new CommandValidationRule(this.loginFormCommandWay, LoginConstants.USER_NAME, [Validators.required]));
    this.commandService.addCommand(new CommandValidationRule(
      this.loginFormCommandWay,
      LoginConstants.PASSWORD,
      [Validators.required, Validators.pattern(this.regexPassword)]));
    this.commandService.executeCommands();

    this.userNameFormContolWay = new FormControl();
    this.userNameFormContolWay.setValidators(Validators.required);
    this.passwordFormControlWay = new FormControl();
    this.passwordFormControlWay.setValidators(Validators.required);

    this.loginFormBuilderWay = this.formBuilder.group(
      { userName: [null, [Validators.required]] },
      { password: [null, [Validators.required]] }
    );
  }

}
