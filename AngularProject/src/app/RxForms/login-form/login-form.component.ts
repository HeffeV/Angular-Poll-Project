import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { AuthenticateService } from 'src/app/User/services/authenticate.service';
import { UserLogin } from 'src/app/User/models/user-login.model';
import { Router,ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { EventEmitter } from 'events';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
loggedIn = true;
model:UserLogin = new UserLogin("","");
loginForm = this.fb.group({
  username: [''],
  password: ['']
  });
  submitted : boolean = false;
  constructor(private fb: FormBuilder,private _authenticateService : AuthenticateService,private router: Router,private appComp:AppComponent) { 
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e
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

  onSubmit()
  {
    this.submitted = true;
    this.model.password = this.loginForm.controls["password"].value;
    this.model.username = this.loginForm.controls["username"].value;
    this._authenticateService.authenticate(this.model).subscribe(result => {
      this._authenticateService.isLoggedin.next(result.token ? true : false);
      localStorage.setItem("token",result.token);
      this.router.navigate(["/dashboard"]);
    });
    
  }



}
