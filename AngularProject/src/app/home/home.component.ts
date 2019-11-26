import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { HomeService } from './home.service';
import { HomePageStats } from './home-page-stats.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homePageStats:HomePageStats=new HomePageStats(0,0);
  constructor(private _homeservice:HomeService ) {
    
  }

  ngOnInit() {
    //Home page statistieken opvragen vanuit de back end
    this._homeservice.getNumberOfUsersAndPolls().subscribe(e=>
      this.homePageStats = new HomePageStats(e.amountPolls,e.amountUsers));
  }


}
