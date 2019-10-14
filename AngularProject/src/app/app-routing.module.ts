import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './RxForms/login-form/login-form.component';
import { RegisterFormComponent } from './RxForms/register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { DashboardCompComponent } from './userdashboard/dashboard-comp/dashboard-comp.component';

const routes: Routes = [
  {path: '', component: HomeComponent,},
  {path: 'login', component: LoginFormComponent,},
  {path: 'register', component: RegisterFormComponent,},
  {path: 'dashboard', component: DashboardCompComponent,}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
