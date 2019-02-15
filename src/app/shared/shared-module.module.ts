import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    DevExtremeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DevExtremeModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class SharedModuleModule { }
