import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/services/poll.service';
import { User } from 'src/app/Models/user.model';
import { Poll } from 'src/app/Models/poll.model';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})
export class MyPollsComponent implements OnInit {
  
  user;
  allPolls:Poll[]=[];
  myPolls:Poll[]=[];
  invitedPolls:Poll[]=[];
  constructor(private _pollservice:PollService) { }

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
          this.allPolls=e;
          this.allPolls.forEach(element=>
            {
              if(element.accepted){
                this.myPolls.push(element);
              }
              else{
                this.invitedPolls.push(element);
              }
            })
        }
        );

      /*this.allPolls.forEach(element=>{
        if(element.accepted){
          this.myPolls.push(element);
        }
        else{
          this.invitedPolls.push(element);
        }*/
    }
  }


}
