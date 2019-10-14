import { Injectable } from '@angular/core';
import { User } from '../../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from 'src/app/Models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http: HttpClient) { }
  
addUser(userReg: User) {
  return this.http.post<User>("https://localhost:44308/api/User", userReg);
  }
}
