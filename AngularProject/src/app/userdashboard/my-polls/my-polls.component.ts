import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/services/poll.service';
import { User } from 'src/app/Models/user.model';
import { Poll } from 'src/app/Models/poll.model';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})
export class MyPollsComponent implements OnInit {
  
  user;
  myPolls:Poll[]=[];
  invitedPolls:Poll[]=[];
  constructor(private _pollservice:PollService,private router:Router) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    if(localStorage.getItem('token')!=null){
      let jwtData=localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      this.user = JSON.parse(decodedJwt);
      this._pollservice.getPolls(this.user.UserID).subscribe(e=>
        {
          this.myPolls=e;
        });
      this._pollservice.getPollInvites(this.user.UserID).subscribe(e=>{
        this.invitedPolls=e;
      });
    }
  }

  btnAccept(pollid:number){
    this._pollservice.acceptPollInvite(this.user.UserID,pollid).subscribe(e=>{
      this.ngOnInit();
    });
  }

  btnDecline(pollid:number){
    this._pollservice.declinePollInvite(this.user.UserID,pollid).subscribe(e=>{
      this.ngOnInit();
    });
  }


}
