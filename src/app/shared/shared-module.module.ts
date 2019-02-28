import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { CommonModule } from '@angular/common';
import { FormService, CommandService } from './services';

const COMPONENTS = [ShowErrorComponent];
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
