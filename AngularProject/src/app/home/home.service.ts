import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debug } from 'util';
import { User } from '../User/models/user.model';
import { HomePageStats } from './home-page-stats.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getNumberOfUsersAndPolls():Observable<HomePageStats>{
    return this.http.get<HomePageStats>("https://localhost:44308/api/Polls/homePageStats");
  }
}
