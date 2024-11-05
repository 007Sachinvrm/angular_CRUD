import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { login, signUp } from '../../data-type';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup; 
  loginForm: FormGroup;
  showLogin = false;
  authError: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private users: UserService,
    private router: Router // Inject Router here
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.users.userAuthReload();
  }

  userSignup(data: signUp) {
   console.log("first", data);
   this.users.userSignup(data);
   this.registerForm.reset();  
  }

  userLogin(data: login): void {
    this.users.userLogin(data);
    this.users.invalidUserAuth.subscribe((result) => {
      if (result) {
        // Show an alert for invalid credentials
        alert('Invalid username or password');
        this.authError = 'Invalid username or password';
        // Optionally, reset the login form if necessary
        this.loginForm.reset();
      }
    });
  }
  
  // userLogin(data: login): void{
  //   this.users.userLogin(data);
  //   this.users.invalidUserAuth.subscribe((result)=>{
  //     if(result){
  //       alert('Invalid username or password');
  //       }
  //   })
  // }

  openLogin() {
    this.showLogin = false;
  }

  openSignup() {
    this.showLogin = true;
  }
}
