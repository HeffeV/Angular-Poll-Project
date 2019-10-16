import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll } from 'src/app/Models/poll.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  pollString;
  constructor(private http: HttpClient) { }

  getPolls(userid:number):Observable<Poll[]>{
    return this.http.get<Poll[]>("https://localhost:44308/api/Polls?userid="+userid);
  }
  getPollInvites(userid:number):Observable<Poll[]>{
    return this.http.get<Poll[]>("https://localhost:44308/api/Polls/pollInvites?userid="+userid);
  }
  acceptPollInvite(userid:number,pollid:number){
    return this.http.post("https://localhost:44308/api/Polls/acceptPoll?userID="+userid+"&pollID="+pollid,null);
  }
  declinePollInvite(userid:number,pollid:number){
    return this.http.post("https://localhost:44308/api/Polls/declinePoll?userID="+userid+"&pollID="+pollid,null);
  }
  voteForPoll(userid:number,pollAnswer:number,pollID:number){
    return this.http.post("https://localhost:44308/api/Polls/pollVote?userID="+userid+"&pollAnswerID="+pollAnswer+"&pollID="+pollID,null)
  }
}
