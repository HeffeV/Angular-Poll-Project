import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/Models/poll.model';
import { PollService } from 'src/app/services/services/poll.service';
import { User } from 'src/app/Models/user.model';
import { FriendlistService } from 'src/app/services/services/friendlist.service';

@Component({
  selector: 'app-poll-invite',
  templateUrl: './poll-invite.component.html',
  styleUrls: ['./poll-invite.component.scss']
})
export class PollInviteComponent implements OnInit {
  success=false;
  error=false;
  poll:Poll;
  myFriends: User[] = [];
  constructor(private pollservice:PollService,private friendservice:FriendlistService) {

    this.pollservice.pollVote.subscribe(e=>{
      if(e!=null){
        this.pollservice.getPoll(e).subscribe(e=>{
          this.poll=e;
        })
      }
    })
    this.friendservice.friendList.subscribe(e=>{
      this.myFriends=e;
    })
   }

  ngOnInit() {
  }

  btnInviteFriend(userid:number,pollid:number){
    this.pollservice.inviteFriendToPoll(pollid,userid).subscribe(
      (res:any)=>{
        this.error=false;
        this.success=true;
      },
      e=>{
        this.error=true;
        this.success=false;
    }
    );
  }

}
