import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Poll } from 'src/app/Models/poll.model';
import { UserserviceService } from 'src/app/services/services/userservice.service';
import { PollService } from 'src/app/services/services/poll.service';
import { User } from 'src/app/Models/user.model';
import { PollAnswer } from 'src/app/Models/poll-answer.model';
import { FriendlistService } from 'src/app/services/services/friendlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {
  poll:Poll;
  user;
  answer:PollAnswer;
  createForm=this.fb.group({
    pollName:[''],
    pollSingleVote:['false']
  });
  answerForm = this.fb.group({
    pollAnswer: ['']
  });
  pollAnswers:PollAnswer[]=[];
  myFriends:User[]=[];
  invitedFriends:User[]=[];
  constructor(private fb: FormBuilder,private userservice:UserserviceService,private _pollservice:PollService,private _friendservice:FriendlistService,private router:Router) { }

  ngOnInit() {
    this.user = this.userservice.getUser();
    this.poll= new Poll(0,"",this.user.UserID,true,null)
    this._friendservice.getFriends(this.user.UserID).subscribe(e=>{
      this.myFriends=e;
    });
  }

  btnSubmit(){
    this.poll.name = this.createForm.value.pollName;
    this.poll.singleVote = this.createForm.value.pollSingleVote;

    this._pollservice.addPoll(this.poll).subscribe(
      (res:any)=>{
        this.pollAnswers.forEach(e=>{
          this._pollservice.addPollAnswer(res,e.answer).subscribe();
        });
        this.invitedFriends.forEach(e=>{
          this._pollservice.inviteFriendToPoll(res,e.userID).subscribe();
        })
        this.router.navigate(["/dashboard"]);
      },
      e=>{
        console.log("Error");
    });
  }

  btnAddAnswer(){
    this.pollAnswers.push(this.answer = new PollAnswer(null,null,this.answerForm.value.pollAnswer,null))
  }

  btnDeleteAnswer(answer:PollAnswer){
    var index=this.poll.pollAnswers.indexOf(answer);
    this.poll.pollAnswers.splice(index,1);
  }

  btnAddFriend(friend:User){
    this.invitedFriends.push(friend);
    var index = this.myFriends.indexOf(friend);
    this.myFriends.splice(index,1);
  }

  btnRemoveFriend(friend:User){
    this.myFriends.push(friend);
    var index = this.invitedFriends.indexOf(friend);
    this.invitedFriends.splice(index,1);
  }

}
