import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { signUp } from '../../data-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  updateForm: FormGroup;
  userId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private users: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: this.formBuilder.array([]) // Initialize as FormArray
    });
  }

  ngOnInit(): void {
    this.userId = String(this.route.snapshot.paramMap.get('id'));
    this.users.getUserById(this.userId).subscribe((user: signUp) => {
      this.updateForm.patchValue(user); // Fill the form with user data
      if (user.address) {
        this.setAddresses(user.address); // Populate addresses if any
      }
    });
  }

  // Getter to easily access the address form array
  get addressControls() {
    return this.updateForm.get('address') as FormArray;
  }

  // Method to add a new address to the FormArray
  addAddress() {
    const addressForm = this.formBuilder.group({
      addressLine: ['', Validators.required] // Add your validation here
    });
    this.addressControls.push(addressForm);
  }

  // Method to remove an address by index
  removeAddress(index: number) {
    this.addressControls.removeAt(index);
  }

  // Method to populate existing addresses (if they exist)
  setAddresses(addresses: any[]) {
    addresses.forEach((address: any) => {
      this.addressControls.push(
        this.formBuilder.group({
          addressLine: [address.addressLine, Validators.required]
        })
      );
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.users.updateUser(this.userId, this.updateForm.value).subscribe(() => {
        this.router.navigate(['/']); // Redirect to the user list after update
      });
    }
  }
}
