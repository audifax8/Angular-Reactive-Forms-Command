import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { FormExampleComponent } from "./form-example/form-example.component";
import { AppleComponent } from "./apple/apple.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "form-example", component: FormExampleComponent, pathMatch: "full" },
  { path: "apple", component: AppleComponent, pathMatch: "full" },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "form-example" }
];
const config: ExtraOptions = {
  useHash: true
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
