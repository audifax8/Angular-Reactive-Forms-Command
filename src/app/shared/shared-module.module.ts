import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { CommonModule } from '@angular/common';

const COMPONENTS = [ShowErrorComponent];

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
})
export class SharedModuleModule { }
