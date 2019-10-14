import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http: HttpClient) { }
  
addUser(user: User) {
  return this.http.post<User>("https://localhost:44308/api/User", user);
  }
}
