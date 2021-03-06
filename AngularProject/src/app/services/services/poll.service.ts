import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll } from 'src/app/Models/poll.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  selectedPoll:number;
  
  pollVote = new BehaviorSubject(this.selectedPoll);
  editPoll = new BehaviorSubject(this.selectedPoll);

  pollString;
  constructor(private http: HttpClient) { }

  getPoll(pollid:number){
    return this.http.get<Poll>("https://pollapi.azurewebsites.net/api/Polls/"+pollid);
  }
  getPolls(userid:number):Observable<Poll[]>{
    return this.http.get<Poll[]>("https://pollapi.azurewebsites.net/api/Polls?userid="+userid);
  }
  getPollInvites(userid:number):Observable<Poll[]>{
    return this.http.get<Poll[]>("https://pollapi.azurewebsites.net/api/Polls/pollInvites?userid="+userid);
  }
  acceptPollInvite(userid:number,pollid:number){
    return this.http.post("https://pollapi.azurewebsites.net/api/Polls/acceptPoll?userID="+userid+"&pollID="+pollid,null);
  }
  declinePollInvite(userid:number,pollid:number){
    return this.http.post("https://pollapi.azurewebsites.net/api/Polls/declinePoll?userID="+userid+"&pollID="+pollid,null);
  }
  voteForPoll(userid:number,pollAnswer:number,pollID:number){
    return this.http.post("https://pollapi.azurewebsites.net/api/Polls/pollVote?userID="+userid+"&pollAnswerID="+pollAnswer+"&pollID="+pollID,null)
  }
  deletePoll(pollid:number){
    return this.http.delete("https://pollapi.azurewebsites.net/api/Polls/"+pollid);
  }
  deletePollAnswer(answerid:number){
    return this.http.delete("https://pollapi.azurewebsites.net/api/Polls/deleteAnswer?answerid="+answerid);
  }
  addPollAnswer(pollid:number,answer:string){
    return this.http.post("https://pollapi.azurewebsites.net/api/Polls/addAnswer?pollID="+pollid+"&answer="+answer,null)
  }
  updatePoll(pollid:number,name:string,vote:boolean){
    return this.http.put("https://pollapi.azurewebsites.net/api/Polls/updatePoll?pollid="+pollid+"&name="+name+"&vote="+vote,null)
  }
  inviteFriendToPoll(pollid:number,userid:number){
    return this.http.post("https://pollapi.azurewebsites.net/api/Polls/inviteUserToPoll?pollID="+pollid+"&userID="+userid,null)
  }
  addPoll(poll:Poll){
    return this.http.post("https://pollapi.azurewebsites.net/api/Polls/addPoll",poll);
  }
}
