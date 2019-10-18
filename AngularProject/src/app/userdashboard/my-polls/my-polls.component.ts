import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PollService } from 'src/app/services/services/poll.service';
import { User } from 'src/app/Models/user.model';
import { Poll } from 'src/app/Models/poll.model';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { PollAnswer } from 'src/app/Models/poll-answer.model';
import { UserserviceService } from 'src/app/services/services/userservice.service';
import { PollAnswerVote } from 'src/app/Models/poll-answer-vote.model';


@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})
export class MyPollsComponent implements OnInit {
  @Input() poll: Poll;
  @Output() choosePolls = new EventEmitter<Poll>();
  voted:boolean=false;
  selectedPoll:Poll;
  votedForPoll;
  userAnswerVote;
  user;
  participatingPolls:Poll[]=[];
  myPolls:Poll[]=[];
  invitedPolls:Poll[]=[];
  vote:PollAnswerVote=new PollAnswerVote(null,null,null);
  constructor(private _pollservice:PollService,private router:Router,private userservice:UserserviceService) { }

  ngOnInit() {
    this.getUserData();
    this.participatingPolls=[];
    this.myPolls=[];
    this.invitedPolls=[];
    this.voted=false;
  }

  getUserData(){
    this.user=this.userservice.getUser();
      this._pollservice.getPolls(this.user.UserID).subscribe(e=>
        {
         e.forEach(p=>{
            if(p.owner==this.user.UserID){
              this.myPolls.push(p);
            }
            else{
              this.participatingPolls.push(p);
            }
         })
        });
      this._pollservice.getPollInvites(this.user.UserID).subscribe(e=>{
        this.invitedPolls=e;
      });
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

  btnVote(poll:Poll){
    this.selectedPoll=poll;
    this.votedForPoll=false;
    this.userAnswerVote=0;
    this.selectedPoll.pollAnswers.forEach(a=>{
      a.pollAnswerVotes.forEach(e=>{
        console.log(e);
        if(e.userID==this.user.UserID){
          this.votedForPoll=true;
          this.userAnswerVote=e.pollAnswerID;
        }
      })
    });
    console.log("Useranswervote "+this.userAnswerVote+" votedforpoll "+this.votedForPoll);
  }

  btnVoteAnswer(pollAnswer:PollAnswer){
    this._pollservice.voteForPoll(this.user.UserID,pollAnswer.pollAnswerID,this.selectedPoll.pollID).subscribe();
    this.voted = true;
    this.selectedPoll.pollAnswers.forEach(e=>{
      if(e.pollAnswerID==pollAnswer.pollAnswerID){
        e.pollAnswerVotes.push(this.vote);
        this.voted=true;
      }
    })
  }

  btnCloseVote(){
    if(this.voted){
      this.ngOnInit();
    }
  }

  btnDelete(poll:Poll){
    this.selectedPoll=poll;
  }

  btnConfirmDelete(){
    this._pollservice.deletePoll(this.selectedPoll.pollID).subscribe(e=>{
      this.ngOnInit();
    });
  }

  btnEdit(poll:Poll){
    this._pollservice.editPoll.next(poll.pollID);
    this.router.navigate(["/managepoll"]);
  }

  btnInvite(poll:Poll){
    this._pollservice.pollVote.next(poll.pollID);
  }


}
