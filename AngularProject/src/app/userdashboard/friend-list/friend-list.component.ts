import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { FriendlistService } from 'src/app/services/services/friendlist.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  user;
  myFriends:User[]=[];
  constructor(private _friendservice:FriendlistService) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      let jwtData=localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      this.user = JSON.parse(decodedJwt);
      this._friendservice.getFriends(this.user.UserID).subscribe(e=>{
        this.myFriends=e;
      })
    }
  }

}
