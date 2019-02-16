import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppConstants } from './app.constants';
import { FormState, IdType, InputType } from './shared/enums';
import { IGenerericBox } from './shared/interfaces';

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

  constructor() {
  }

  ngOnInit() {
    this.initializeForm();
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
