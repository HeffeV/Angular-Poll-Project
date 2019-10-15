import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCompComponent } from './dashboard-comp/dashboard-comp.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { BrowserModule } from '@angular/platform-browser';
import { FriendListComponent } from './friend-list/friend-list.component';

@NgModule({
  declarations: [DashboardCompComponent, MyPollsComponent,FriendListComponent],
  imports: [
    CommonModule,BrowserModule
  ],exports:[DashboardCompComponent,MyPollsComponent,FriendListComponent]
})
export class DashboardModule { }
