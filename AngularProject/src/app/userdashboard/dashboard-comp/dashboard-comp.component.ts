import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/services/authenticate.service';
import { UserserviceService } from 'src/app/services/services/userservice.service';

@Component({
  selector: 'app-dashboard-comp',
  templateUrl: './dashboard-comp.component.html',
  styleUrls: ['./dashboard-comp.component.scss']
})
export class DashboardCompComponent implements OnInit {
  loggedIn = false;
  user;
  constructor(private _authenticateService : AuthenticateService,private userservice:UserserviceService) { 
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e;
      })
  }

  ngOnInit() {
    this.loggedIn=this._authenticateService.CheckLoggedIn();
    this.user = this.userservice.getUser();
  }

}
