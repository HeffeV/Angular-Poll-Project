import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { FriendlistService } from 'src/app/services/services/friendlist.service';
import { UserserviceService } from 'src/app/services/services/userservice.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  friendForm = this.fb.group({
    email: ['']
  });
  user;
  myFriends: User[] = [];
  myFriendRequests: User[] = [];
  friendAdded=false;
  showError=false;
  constructor(private fb: FormBuilder, private _friendservice: FriendlistService, private userservice: UserserviceService) { }

  ngOnInit() {
    this.user = this.userservice.getUser();
    this._friendservice.getFriends(this.user.UserID).subscribe(e => {
      this.myFriends = e;
      this._friendservice.friendList.next(this.myFriends);
    });
    this._friendservice.getFriendRequests(this.user.UserID).subscribe(e => {
      this.myFriendRequests = e;
    });
  }

  btnAcceptFriend(friendId: number) {
    this._friendservice.acceptFriend(this.user.UserID, friendId).subscribe(e => {
      this.ngOnInit();
    })
  }
  btnDeclineFriend(friendId: number) {
    this._friendservice.declineFriend(this.user.UserID, friendId).subscribe(e => {
      this.ngOnInit();
    })
  }

  btnAddFriend() {
    this._friendservice.addFriend(this.user.UserID,this.friendForm.value.email).subscribe(
      (res:any)=>{
        this.friendAdded = true;
        this.showError=false;
      },
      e=>{
        this.friendAdded=false;
        this.showError=true;
  });
  }

}
