import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../User/services/authenticate.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  loggedIn = false;
  constructor(private _authenticateService : AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e;
      })
    }

  ngOnInit() {
    if(localStorage.getItem("token")!=null){
      this.loggedIn=true
    }
    else{
      this.loggedIn=false;
    }
  }

}
