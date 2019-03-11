import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent, FormPropertyComponent } from './components';
import { CommonModule } from '@angular/common';
import { FormService, CommandService } from './services';

const COMPONENTS = [ShowErrorComponent, FormPropertyComponent];
const SERVICES = [FormService, CommandService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    DevExtremeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    DevExtremeModule,
    ReactiveFormsModule,
    FormsModule,
    COMPONENTS,
    CommonModule,
  ],
  providers: [
    ...SERVICES
  ]
})
export class SharedModuleModule { }
