import { Component, enableProdMode } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Models/user.model';
import { AuthenticateService } from './services/services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Polltastic';
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
      console.log("App: "+this.loggedIn);
    }

    logOut(){
      this._authenticateService.logOut();
      console.log("Logged out "+this.loggedIn);
    }


}
