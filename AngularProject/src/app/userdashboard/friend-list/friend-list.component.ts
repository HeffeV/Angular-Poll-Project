import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { FriendlistService } from 'src/app/services/services/friendlist.service';
import { UserserviceService } from 'src/app/services/services/userservice.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  user;
  myFriends:User[]=[];
  myFriendRequests:User[]=[];
  constructor(private _friendservice:FriendlistService, private userservice:UserserviceService) { }

  ngOnInit() {
      this.user=this.userservice.getUser();
      this._friendservice.getFriends(this.user.UserID).subscribe(e=>{
        this.myFriends=e;
      });
      this._friendservice.getFriendRequests(this.user.UserID).subscribe(e=>{
        this.myFriendRequests=e;
      });
  }

  btnAcceptFriend(friendId:number){
    this._friendservice.acceptFriend(this.user.UserID,friendId).subscribe(e=>{
      this.ngOnInit();
    })
  }
  btnDeclineFriend(friendId:number){
    this._friendservice.declineFriend(this.user.UserID,friendId).subscribe(e=>{
      this.ngOnInit();
    })
  }

}
