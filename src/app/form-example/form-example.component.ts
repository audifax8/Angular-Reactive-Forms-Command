import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from '.././app.constants';
import { FormState, IdType, InputType, InputStatus } from '.././shared/enums';
import { IGenerericBox, IUser } from '.././shared/interfaces';
import { FormService, CommandService } from '.././shared/services';
import { CommandInputValue, CommandInputState, CommandValidationRule, EqualValidator } from '.././shared/util';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.sass']
})
export class FormExampleComponent implements OnInit {
  regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
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
    phone: '3212975798',
    address: 'avenidad falsa 123',
    countryId: 1,
    departamentId: 1,
    cityId: 1,
    description: 'Reactive-Forms + Command',
    email: 'test@yopmail.com',
    password: 'Angular7*',
    passworConfirm: 'Angular7*',
  };

  maskCelPhone = '+57 (000) 000-0000';

  constructor(
    public formService: FormService,
    private commandService: CommandService
  ) { }

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
    this.form.setValidators(EqualValidator.validate(AppConstants.PASSWORD, AppConstants.PASSWORD_CONFIRM));
  }

  private loadFormByState(formState: FormState): void {
    this.setFormValuesByState(formState);
    this.setFormInputsByState(formState);
    this.setFormValidationRulesByState(formState);
    this.commandService.executeCommands();
  }

  private setFormValuesByState(formState: FormState): void {
    this.formService.reset(this.form);
    if (formState === FormState.DEFAULT) {
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.TYPE_ID, IdType.CC));
    } else {
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.ID_NUMBER, this.user.numberId));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.PASSWORD_CONFIRM, this.user.passworConfirm));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.TYPE_ID, this.user.typeId));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.NAME, this.user.name));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.LAST_NAME, this.user.lastName));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.PHONE, this.user.phone));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.ADDRESS, this.user.address));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.EMAIL, this.user.email));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.PASSWORD, this.user.password));
      this.commandService.addCommand(new CommandInputValue(this.form, AppConstants.DESCRIPTION, this.user.description));
    }
  }

  private setFormInputsByState(formState: FormState): void {
    if (formState === FormState.DEFAULT) {
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.ID_NUMBER, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD_CONFIRM, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.TYPE_ID, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.NAME, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.LAST_NAME, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PHONE, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.ADDRESS, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.EMAIL, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.DESCRIPTION, InputStatus.Enabled));
    } else if (formState === FormState.EDIT) {
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.ID_NUMBER, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD_CONFIRM, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.TYPE_ID, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.NAME, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.LAST_NAME, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PHONE, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.ADDRESS, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.EMAIL, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD, InputStatus.Enabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.DESCRIPTION, InputStatus.Enabled));
    } else if (formState === FormState.DEFINITIVE) {
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.TYPE_ID, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.ID_NUMBER, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.NAME, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.LAST_NAME, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PHONE, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.ADDRESS, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.EMAIL, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD_CONFIRM, InputStatus.Disabled));
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.DESCRIPTION, InputStatus.Disabled));
    }
  }

  private setFormValidationRulesByState(formState: FormState): void {
    if (formState === FormState.DEFAULT) {
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.TYPE_ID, [Validators.required]));
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.ID_NUMBER, [Validators.required]));
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.NAME, [Validators.required]));
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.LAST_NAME, [Validators.required]));
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.PHONE, [Validators.required]));
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.ADDRESS, [Validators.required]));
      this.commandService.addCommand(new CommandValidationRule(
        this.form,
        AppConstants.EMAIL,
        [Validators.required, Validators.email]
      ));
      this.commandService.addCommand(new CommandValidationRule(
        this.form,
        AppConstants.PASSWORD,
        [Validators.required, Validators.pattern(this.regexPassword)]
      ));
      this.commandService.addCommand(new CommandValidationRule(
        this.form,
        AppConstants.PASSWORD_CONFIRM,
        [Validators.required, Validators.pattern(this.regexPassword)]));
      this.commandService.addCommand(new CommandValidationRule(this.form, AppConstants.DESCRIPTION, [Validators.required]));
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
    if (event.value) {
      this.commandService.addCommand(new CommandInputState(this.form, AppConstants.PASSWORD_CONFIRM, InputStatus.Enabled));
    }
    this.commandService.executeCommands();
  }

  public onChangeConfirmPassword(event): void {
  }

}
