import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../User/services/authenticate.service';
import { User } from '../User/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedIn = false;
  user;
  constructor(private _authenticateService : AuthenticateService) { 
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e;
      })
  }

  ngOnInit() {
    if(localStorage.getItem("token")!=null){
      this.loggedIn=true
      this.getUser();
    }
    else{
      this.loggedIn=false;
    }
  }

  getUser(){
    if(localStorage.getItem('token')!=null){
      let jwtData=localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      this.user = JSON.parse(decodedJwt);
    }
  }

}
