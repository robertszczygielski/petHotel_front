import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLoginComponent } from "./home-login/home-login.component";

const routes: Routes = [
  { path: 'home', component: HomeLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
