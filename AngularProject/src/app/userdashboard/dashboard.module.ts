import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCompComponent } from './dashboard-comp/dashboard-comp.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { BrowserModule } from '@angular/platform-browser';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { PollAnswersComponent } from './poll-answers/poll-answers.component';
import { PollInviteComponent } from './poll-invite/poll-invite.component';

@NgModule({
  declarations: [DashboardCompComponent, MyPollsComponent,FriendListComponent, PollDetailsComponent, PollAnswersComponent, PollInviteComponent],
  imports: [
    CommonModule,BrowserModule,ReactiveFormsModule
  ],exports:[DashboardCompComponent,MyPollsComponent,FriendListComponent,PollDetailsComponent,PollInviteComponent]
})
export class DashboardModule { }
