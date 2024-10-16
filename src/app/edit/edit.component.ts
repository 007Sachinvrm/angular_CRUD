import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { signUp } from '../../data-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  updateForm: FormGroup;
  userId: string= '';

  constructor(
    private formBuilder: FormBuilder, 
    private users: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    console.log('EditComponent initialized');
    this.userId = String(this.route.snapshot.paramMap.get('id'));
    this.users.getUserById(this.userId).subscribe((user: signUp) => {
      this.updateForm.patchValue(user); // Fill the form with user data
    });
  }

  fetchUsers(userId: string) {
    this.users.getUserById(userId).subscribe((data) => {
      this.updateForm.patchValue(data);
      console.log(data);
  
    });
  }
  onSubmit(userId: signUp){
    console.log(userId);
    if (this.updateForm.valid) {
      this.users.updateUser(this.userId, this.updateForm.value).subscribe(() => {
        this.router.navigate(['/']); // Redirect to the user list after successful update
      });
    }
  }
}
