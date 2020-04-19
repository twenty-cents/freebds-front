import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../services/security/auth.service';
import { TokenStorageService } from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  submitted = false;
  loginForm;

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    // Init form to avoid an error when the component is rendered
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)])
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.errorMessage;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

    /**
 * Generic error manager for the form controler
 * @param controlName The name property of the field to control (see <mat-error> tag in the template for more details)
 * @param errorName The name property of the error to control (see <mat-error> tag in the template for more details)
 */
hasError = (controlName: string, errorName: string) => {
  return this.loginForm.controls[controlName].hasError(errorName);
}

}
