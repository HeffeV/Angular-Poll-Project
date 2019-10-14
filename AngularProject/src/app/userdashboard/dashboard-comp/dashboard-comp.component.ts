import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/services/authenticate.service';

@Component({
  selector: 'app-dashboard-comp',
  templateUrl: './dashboard-comp.component.html',
  styleUrls: ['./dashboard-comp.component.scss']
})
export class DashboardCompComponent implements OnInit {
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
