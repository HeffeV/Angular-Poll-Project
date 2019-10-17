import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poll } from 'src/app/Models/poll.model';
import { PollService } from 'src/app/services/services/poll.service';
import { FormBuilder } from '@angular/forms';
import { PollAnswer } from 'src/app/Models/poll-answer.model';

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
  constructor(private pollservice:PollService,private fb: FormBuilder) { }

  ngOnInit() {
    this.pollservice.getSelectedPoll().subscribe(e=>{
      this.poll=e
      this.editForm.controls.pollName.setValue(this.poll.name);
      this.editForm.controls.pollSingleVote.setValue(this.poll.singleVote);
    });
  }

  onSubmit(){
    this.pollservice.updatePoll(this.poll.pollID,this.editForm.value.pollName,this.editForm.value.pollSingleVote).subscribe(e=>{
      this.ngOnInit();
    })
  }

}
