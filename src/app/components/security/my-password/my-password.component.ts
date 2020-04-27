import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { User } from '../../../models/security/user';
import { UserService } from '../../../services/security/user.service';
import { TokenStorageService } from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-my-password',
  templateUrl: './my-password.component.html',
  styleUrls: ['./my-password.component.css']
})
export class MyPasswordComponent implements OnInit {

  user: User;

  userForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) {
    
    if (this.tokenStorage.getToken()) {
      this.user = this.tokenStorage.getUser();
    }

    this.userForm = this.formBuilder.group({
      oldpwd: new FormControl(''),
      newpwd: new FormControl(''),
      newpwd2: new FormControl('')
    });
   }

  ngOnInit(): void {
  }

     /**
   * Reset User Form
   */
  resetUserForm() {
    this.submitted = false;
    //this.updateStatusCode = undefined;
    //this.initUserForm();
  }

    /**
   * Validate the user form
   * @param userFormValues
   */
  saveUser(userFormValues) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

  }
  
    /**
   * Generic error manager for the form controler
   * @param controlName The name property of the field to control (see <mat-error> tag in the template for more details)
   * @param errorName The name property of the error to control (see <mat-error> tag in the template for more details)
   */
  hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
