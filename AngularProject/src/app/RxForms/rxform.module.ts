import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RouterModule } from '@angular/router';
import { CreatePollComponent } from './create-poll/create-poll.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, CreatePollComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  exports:[LoginFormComponent,RegisterFormComponent,CreatePollComponent]
})
export class RxFormModule { }
