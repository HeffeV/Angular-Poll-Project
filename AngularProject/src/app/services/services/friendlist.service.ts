import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendlistService {

  myFriends: User[] = [];

  friendList = new BehaviorSubject(this.myFriends);

  constructor(private http:HttpClient) { }

  getFriends(userid:number):Observable<User[]>{
    return this.http.get<User[]>("https://localhost:44308/api/User/getFriends?userid="+userid);
  }
  getFriendRequests(userid:number):Observable<User[]>{
    return this.http.get<User[]>("https://localhost:44308/api/User/getFriendRequests?userid="+userid);
  }
  acceptFriend(userid:number,friendid:number){
    return this.http.post("https://localhost:44308/api/User/acceptFriend?userID="+userid+"&friendID="+friendid,null);
  }
  declineFriend(userid:number,friendid:number){
    return this.http.post("https://localhost:44308/api/User/deleteFriend?userID="+userid+"&friendID="+friendid,null);
  }
  addFriend(userid:number,friendemail:string){
    return this.http.post("https://localhost:44308/api/User/addFriend?userid="+userid+"&friendEmail="+friendemail,null);
  }
}
