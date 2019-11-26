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

    //request current poll id
    this.pollservice.pollVote.subscribe(e=>{
      if(e!=null){
        //request poll from backend
        this.pollservice.getPoll(e).subscribe(e=>{
          this.poll=e;
        })
      }
    })
    //request friendlist
    this.friendservice.friendList.subscribe(e=>{
      this.myFriends=e;
    })
   }

  ngOnInit() {
  }

  btnInviteFriend(userid:number,pollid:number){
    //invite friend to poll
    this.pollservice.inviteFriendToPoll(pollid,userid).subscribe(
      (res:any)=>{
        //indien alles ok errors afzetten.
        this.error=false;
        this.success=true;
      },
      e=>{
        //indien error, errors aanzetten.
        this.error=true;
        this.success=false;
    }
    );
  }

}
