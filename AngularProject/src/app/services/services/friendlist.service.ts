import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendlistService {

  constructor(private http:HttpClient) { }

  getFriends(userid:number):Observable<User[]>{
    return this.http.get<User[]>("https://localhost:44308/api/User/getFriends?userid="+userid);
  }
}
