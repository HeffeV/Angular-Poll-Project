import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User/models/user.model';
import { UserserviceService } from 'src/app/User/services/userservice.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  submitted : boolean = false;
  model:User;
  registerForm = this.fb.group({
    username: [''],
    email:[''],
    password: ['']
    });
  constructor(private fb: FormBuilder, private _userservice:UserserviceService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.submitted = true;
    this.model = new User(this.registerForm.controls["email"].value,
    this.registerForm.controls["password"].value,
    this.registerForm.controls["username"].value)

    console.log(this.model);

    this._userservice.addUser(this.model).subscribe(e=>console.log(e));
    this.router.navigate(["/login"]);

  }

}
