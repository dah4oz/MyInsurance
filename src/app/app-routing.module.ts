import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {LoginComponent} from './login/login.component';
import {LoginActivate} from './login/LoginActivate';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: CustomersComponent, canActivate: [LoginActivate]},
  {path: 'login', component: LoginComponent, canLoad: [!LoginActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
