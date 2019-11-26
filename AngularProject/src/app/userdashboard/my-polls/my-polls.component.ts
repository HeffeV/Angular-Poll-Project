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
    //alle gebruiker info opvragen
    this.user=this.userservice.getUser();
    //user zijn polls.
      this._pollservice.getPolls(this.user.UserID).subscribe(e=>
        {
         e.forEach(p=>{
           //als gebruiker eigenaar is van poll toevoegen aan mypolls
            if(p.owner==this.user.UserID){
              this.myPolls.push(p);
            }
            //als gebruiker deelnemer is van iemand anders zijn poll toevoegen aan deelnemende polls.
            else{
              this.participatingPolls.push(p);
            }
         })
        });
        //poll invites opvragen.
      this._pollservice.getPollInvites(this.user.UserID).subscribe(e=>{
        this.invitedPolls=e;
      });
  }

  //poll invite accepteren
  btnAccept(pollid:number){
    this._pollservice.acceptPollInvite(this.user.UserID,pollid).subscribe(e=>{
      this.ngOnInit();
    });
  }

  //poll inviten niet accepteren
  btnDecline(pollid:number){
    this._pollservice.declinePollInvite(this.user.UserID,pollid).subscribe(e=>{
      this.ngOnInit();
    });
  }

  //pollvote modal openen en huidige poll als selected poll zetten.
  btnVote(poll:Poll){
    this.selectedPoll=poll;
    this.votedForPoll=false;
    this.userAnswerVote=0;
    this.selectedPoll.pollAnswers.forEach(a=>{
      a.pollAnswerVotes.forEach(e=>{
        //controleren of gebruiker al eens gevote heeft voor een poll antwoord en welk antwoord.
        if(e.userID==this.user.UserID){
          this.votedForPoll=true;
          this.userAnswerVote=e.pollAnswerID;
        }
      })
    });
  }

  //vote for answer
  btnVoteAnswer(pollAnswer:PollAnswer){
    this._pollservice.voteForPoll(this.user.UserID,pollAnswer.pollAnswerID,this.selectedPoll.pollID).subscribe();
    this.voted = true;
    this.selectedPoll.pollAnswers.forEach(e=>{
      //nieuwe vote toevoegen aan aantal votes voor dit antwoord.
      if(e.pollAnswerID==pollAnswer.pollAnswerID){
        e.pollAnswerVotes.push(this.vote);
        this.voted=true;
      }
    })
  }

  //close vote modal and refresh component.
  btnCloseVote(){
    if(this.voted){
      this.ngOnInit();
    }
  }

  //delete poll
  btnDelete(poll:Poll){
    this.selectedPoll=poll;
  }

  //confirm poll delete
  btnConfirmDelete(){
    this._pollservice.deletePoll(this.selectedPoll.pollID).subscribe(e=>{
      this.ngOnInit();
    });
  }

  //edit poll
  btnEdit(poll:Poll){
    this._pollservice.editPoll.next(poll.pollID);
    this.router.navigate(["/managepoll"]);
  }
  //invite (open modal)
  btnInvite(poll:Poll){
    this._pollservice.pollVote.next(poll.pollID);
  }


}
