import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from './app.constants';
import { FormState } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  AppConstants = AppConstants;
  FormState = FormState;

  constructor() {
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({});
  }
}
