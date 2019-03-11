import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-property',
  templateUrl: './form-property.component.html',
  styleUrls: ['./form-property.component.sass']
})
export class FormPropertyComponent implements OnInit {
  @Input() form: FormGroup | FormControl;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

  public getClassName(): string {
    let className = '';
    if (this.form.touched && this.form.invalid) {
      className = 'bg-warning';
    } else if (this.form.dirty && this.form.invalid) {
      className = 'bg-danger';
    } else if (this.form.touched && this.form.valid) {
      className = 'bg-success';
    } else if (this.form.dirty && this.form.valid) {
      className = 'bg-success';
    }
    return className;
  }

}
