import { NgModule } from '@angular/core';
// import { DxButtonModule  } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    // DxButtonModule ,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    // DxButtonModule ,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class SharedModuleModule { }
