import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { UserLogin } from 'src/app/Models/user-login.model';
import { Router,ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { EventEmitter } from 'events';
import { AppComponent } from 'src/app/app.component';
import { AuthenticateService } from 'src/app/services/services/authenticate.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginError;
  showError=false;
loggedIn = true;
model:UserLogin = new UserLogin("","");
loginForm = this.fb.group({
  username: [''],
  password: ['']
  });
  submitted : boolean = false;
  constructor(private fb: FormBuilder,private _authenticateService : AuthenticateService,private router: Router,private appComp:AppComponent) { 
    //Checken of er een gebruiker ingelogt is.
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e
      })
  }


  ngOnInit() {
    //dubbele controle of er zeker een token aanwezig is en dus een gebruiker ingelogt is.
    if(localStorage.getItem("token")!=null){
      this.loggedIn=true
    }
    else{
      this.loggedIn=false;
    }
    //alle errors afzetten.
    this.showError=false;
  }

  onSubmit()
  {
    this.submitted = true;
    //model aanvullen met data van form
    this.model.password = this.loginForm.controls["password"].value;
    this.model.username = this.loginForm.controls["username"].value;
    //model naar back end sturen en kijken of deze klopt.
    this._authenticateService.authenticate(this.model).subscribe(
      (res: any) => {
        //als login klopt token aanvullen en naar dashboard navigeren.
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
        //gebruiker ingelogt zetten.
        this._authenticateService.isLoggedin.next(true);
      },
      err => {
        //indien inloggen niet gelukt is errors tonen.
          this.loginError='Incorrect username or password.';
          this.showError=true;
          this.submitted = false;
      }
    );
    
  }



}
