import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SharedModuleModule } from "./shared/shared-module.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormExampleComponent } from "./form-example/form-example.component";
import { AppleComponent } from "./apple/apple.component";

const COMPONENTS = [
  AppComponent,
  LoginComponent,
  FormExampleComponent,
  AppleComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [BrowserModule, AppRoutingModule, SharedModuleModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
