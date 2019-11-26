import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserserviceService } from 'src/app/services/services/userservice.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/Models/user-registration.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  submitted : boolean = false;
  model:User;
  registerError;
  showError=false;
  registerForm = this.fb.group({
    Username: [''],
    Email:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
    });
  constructor(private fb: FormBuilder, private _userservice:UserserviceService,private router:Router) { }

  //passwoords checken of ze overeenkomen
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      //passwoords kloppen niet.
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
      //passwoords kloppen.
        confirmPswrdCtrl.setErrors(null);
    }
  }

  ngOnInit() {
    this.registerForm.reset();
    this.showError=false;
  }

  onSubmit()
  {
    this.submitted = true;
    //model aanvullen.
    this.model = new User(0,this.registerForm.value.Email,
    this.registerForm.value.Passwords.Password,
    this.registerForm.value.Username,"");

    //gebruiker aanmaken.
    this._userservice.addUser(this.model).subscribe(
      (res:any)=>{
        //indien user aangemaakt is verder gaan naar loginform
        this.router.navigate(["/login"]);
      },
      e=>{
        //indien username of email al bestaat error tonen.
        this.registerError="Username or Email already exists!"
        this.showError=true;
        this.submitted = false;
  });
}

}
