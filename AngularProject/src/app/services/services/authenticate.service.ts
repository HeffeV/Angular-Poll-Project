import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../Models/user-login.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../Models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLoggedin = new BehaviorSubject(false);
  constructor(private _httpClient: HttpClient,private router:Router) { }
  authenticate(userLogin: UserLogin): Observable<User> {
  return this._httpClient.post<User>("https://pollapi.azurewebsites.net/api/authenticate/authenticate", userLogin);
  }
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
    this.isLoggedin.next(false);
  }

  //return bool of er een gebruiker ingelogt is ofniet.
  CheckLoggedIn(){
    if(localStorage.getItem("token")!=null){
      return true;
    }
    else{
      return false;
    }
  }


}
