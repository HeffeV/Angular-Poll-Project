import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll } from 'src/app/Models/poll.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  getPolls(userid:number):Observable<Poll[]>{
    return this.http.get<Poll[]>("https://localhost:44308/api/Polls?userid="+userid);
  }
}
