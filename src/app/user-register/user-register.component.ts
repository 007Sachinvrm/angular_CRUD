import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { signUp } from '../../data-type';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup; 

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
  }

  ngOnInit() {}

  onSubmit(data: signUp) {
   console.log("first", data);
   this.users.userSignup(data);
   this.registerForm.reset();  
  }
}
