import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { User } from '../../../models/security/user';
import { UserService } from '../../../services/security/user.service';
import { TokenStorageService } from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User;

  userForm: FormGroup;
  submitted = false;
  avatar: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService

  ) { 

    if (this.tokenStorage.getToken()) {
      this.user = this.tokenStorage.getUser();
      this.avatar = this.user.avatar;
    }

    this.userForm = this.formBuilder.group({
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email),
      avatar: new FormControl(this.user.avatar)
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

  updateAvatar(inputAvatar) {
    this.avatar = inputAvatar.value;
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
