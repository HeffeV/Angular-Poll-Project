import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/Models/poll.model';
import { PollAnswer } from 'src/app/Models/poll-answer.model';
import { PollService } from 'src/app/services/services/poll.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-poll-answers',
  templateUrl: './poll-answers.component.html',
  styleUrls: ['./poll-answers.component.scss']
})
export class PollAnswersComponent implements OnInit {
  answerForm = this.fb.group({
    pollAnswer: ['']
  })
  poll:Poll;
  constructor(private pollservice:PollService,private fb: FormBuilder) { }

  ngOnInit() {
    //poll opvragen
    this.pollservice.editPoll.subscribe(e=>{
      this.pollservice.getPoll(e).subscribe(e=>{
        this.poll=e;
      })
    })
  }

  btnDeleteAnswer(answer:PollAnswer){
    this.pollservice.deletePollAnswer(answer.pollAnswerID).subscribe(e=>{
      //huidige poll id in service opnieuw updaten
      this.pollservice.editPoll.next(this.poll.pollID)
      //refresh
      this.ngOnInit()
    });
  }

  btnAddAnswer(){
    this.pollservice.addPollAnswer(this.poll.pollID,this.answerForm.value.pollAnswer).subscribe(e=>{
      //huidige poll id in service opnieuw updaten
      this.pollservice.editPoll.next(this.poll.pollID)
      //refresh
      this.ngOnInit()
    });
  }

}
