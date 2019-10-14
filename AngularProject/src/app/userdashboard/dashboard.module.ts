import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCompComponent } from './dashboard-comp/dashboard-comp.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [DashboardCompComponent, MyPollsComponent],
  imports: [
    CommonModule,BrowserModule
  ],exports:[DashboardCompComponent,MyPollsComponent]
})
export class DashboardModule { }
