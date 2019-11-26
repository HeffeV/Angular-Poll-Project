import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poll } from 'src/app/Models/poll.model';
import { PollService } from 'src/app/services/services/poll.service';
import { FormBuilder } from '@angular/forms';
import { PollAnswer } from 'src/app/Models/poll-answer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit {
  poll: Poll;
  editForm = this.fb.group({
    pollName: [''],
    pollSingleVote: ['']
    });
  constructor(private pollservice:PollService,private fb: FormBuilder,private router:Router) {
    this.pollservice.editPoll.subscribe(e=>{
      this.pollservice.getPoll(e).subscribe(e=>{
        this.poll=e;
        //form values naar de huidige form zetten.
        this.editForm.controls.pollName.setValue(this.poll.name);
        this.editForm.controls.pollSingleVote.setValue(this.poll.singleVote);
      })
    })
   }

  ngOnInit() {
  }

  onSubmit(){
    //poll doorsturen om te updaten.
    this.pollservice.updatePoll(this.poll.pollID,this.editForm.value.pollName,this.editForm.value.pollSingleVote).subscribe(e=>{
      //refresh
      this.ngOnInit();
      //alles ok -> ga naar dashboard
      this.router.navigate(["/dashboard"]);
    })
  }

}
