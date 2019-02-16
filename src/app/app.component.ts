import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from './app.constants';
import { FormState, IdType, InputType, InputCommand } from './shared/enums';
import { IGenerericBox, IUser } from './shared/interfaces';
import { FormService } from './shared/services';
import { CommandInputValue, CommandInputState, CommandValidationRule } from './shared/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  AppConstants = AppConstants;
  FormState = FormState;
  InputType = InputType;
  idTypes: IGenerericBox[] = [
    { id: IdType.CC, value: 'Cédula de ciudadanía' },
    { id: IdType.CE, value: 'Cédula de extrangería' },
    { id: IdType.RC, value: 'Registro civil' },
    { id: IdType.TI, value: 'Targeta de Identidad' },
  ];

  user: IUser = {
    typeId: IdType.CE,
    numberId: 123456789,
    name: 'Angular Reactive-Forms',
    lastName: 'Command',
    phone: 123456789,
    address: 'avenidad falsa 123',
    countryId: 1,
    departamentId: 1,
    cityId: 1,
    description: 'Reactive-Forms + Command',
    email: 'test@yopmail.com',
    password: '123456789',
    passworConfirm: '123456789',
  };

  constructor(
    public formService: FormService,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.loadFormByState(FormState.DEFAULT);
  }

  private initializeForm(): void {
    this.form = new FormGroup({});
    const idNumber = new FormControl();
    const typeId = new FormControl();
    const name = new FormControl();
    const lastName = new FormControl();
    const phone = new FormControl();
    const address = new FormControl();
    const country = new FormControl();
    const departament = new FormControl();
    const city = new FormControl();
    const description = new FormControl();
    const email = new FormControl();
    const password = new FormControl();
    const passwordConfirm = new FormControl();
    this.form.addControl(AppConstants.ID_NUMBER, idNumber);
    this.form.addControl(AppConstants.TYPE_ID, typeId);
    this.form.addControl(AppConstants.NAME, name);
    this.form.addControl(AppConstants.LAST_NAME, lastName);
    this.form.addControl(AppConstants.PHONE, phone);
    this.form.addControl(AppConstants.ADDRESS, address);
    this.form.addControl(AppConstants.COUNTRY, country);
    this.form.addControl(AppConstants.DEPARTAMENT, departament);
    this.form.addControl(AppConstants.CITY, city);
    this.form.addControl(AppConstants.DESCRIPTION, description);
    this.form.addControl(AppConstants.EMAIL, email);
    this.form.addControl(AppConstants.PASSWORD, password);
    this.form.addControl(AppConstants.PASSWORD_CONFIRM, passwordConfirm);
  }

  private loadFormByState(formState: FormState): void {
    this.setFormValuesByState(formState);
    this.setFormInputsByState(formState);
    this.setFormValidationRulesByState(formState);
    this.formService.executeCommands(this.form);
  }

  private setFormValuesByState(formState: FormState): void {
    if (formState === FormState.DEFAULT) {
      this.formService.reset(this.form);
    } else {
      this.formService.addCommand(new CommandInputValue(AppConstants.ID_NUMBER, this.user.numberId));
      this.formService.addCommand(new CommandInputValue(AppConstants.PASSWORD_CONFIRM, this.user.passworConfirm));
      this.formService.addCommand(new CommandInputValue(AppConstants.TYPE_ID, this.user.typeId));
      this.formService.addCommand(new CommandInputValue(AppConstants.NAME, this.user.name));
      this.formService.addCommand(new CommandInputValue(AppConstants.LAST_NAME, this.user.lastName));
      this.formService.addCommand(new CommandInputValue(AppConstants.PHONE, this.user.phone));
      this.formService.addCommand(new CommandInputValue(AppConstants.ADDRESS, this.user.address));
      this.formService.addCommand(new CommandInputValue(AppConstants.EMAIL, this.user.email));
      this.formService.addCommand(new CommandInputValue(AppConstants.PASSWORD, this.user.password));
      this.formService.addCommand(new CommandInputValue(AppConstants.DESCRIPTION, this.user.description));
    }
  }

  private setFormInputsByState(formState: FormState): void {
    if (formState === FormState.DEFAULT) {
      this.formService.addCommand(new CommandInputState(AppConstants.ID_NUMBER, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PASSWORD_CONFIRM, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.TYPE_ID, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.NAME, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.LAST_NAME, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PHONE, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.ADDRESS, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.EMAIL, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PASSWORD, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.DESCRIPTION, InputCommand.Enabled));
    } else if (formState === FormState.EDIT) {
      this.formService.addCommand(new CommandInputState(AppConstants.ID_NUMBER, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PASSWORD_CONFIRM, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.TYPE_ID, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.NAME, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.LAST_NAME, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PHONE, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.ADDRESS, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.EMAIL, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PASSWORD, InputCommand.Enabled));
      this.formService.addCommand(new CommandInputState(AppConstants.DESCRIPTION, InputCommand.Enabled));
    } else if (formState === FormState.DEFINITIVE) {
      this.formService.addCommand(new CommandInputState(AppConstants.TYPE_ID, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.ID_NUMBER, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.NAME, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.LAST_NAME, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PHONE, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.ADDRESS, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.EMAIL, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PASSWORD, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.PASSWORD_CONFIRM, InputCommand.Disabled));
      this.formService.addCommand(new CommandInputState(AppConstants.DESCRIPTION, InputCommand.Disabled));
    }
  }

  private setFormValidationRulesByState(formState: FormState): void {
    if (formState === FormState.DEFAULT) {
      this.formService.addCommand(new CommandValidationRule(AppConstants.TYPE_ID, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.NAME, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.LAST_NAME, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.PHONE, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.ADDRESS, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.EMAIL, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.PASSWORD, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.PASSWORD_CONFIRM, [Validators.required]));
      this.formService.addCommand(new CommandValidationRule(AppConstants.DESCRIPTION, [Validators.required]));
    } else if (formState === FormState.EDIT) {
    } else if (formState === FormState.DEFINITIVE) {
    }
  }

  public getPlaceholderByInputType(type: InputType): string {
    if (type === InputType.SelectBox) {
      return 'Seleccione...';
    } else if ((type === InputType.NumberBox) || (type === InputType.TextBox)) {
      return 'Ingrese';
    }
  }

  public onChangeIdType(event): void {
  }

  public onChangeIdNumber(event): void {
  }

  public onChangeName(event): void {
  }

  public onChangeLastName(event): void {
  }

  public onChangePhone(event): void {
  }

  public onChangeAddress(event): void {
  }

  public onChangeDescription(event): void {
  }

  public onChangeEmail(event): void {
  }

  public onChangePassword(event): void {
  }

  public onChangeConfirmPassword(event): void {
  }
}
