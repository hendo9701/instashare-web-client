import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PersistedCredentials} from "../../models/persistedCredentials";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value.email, this.validateForm.value.password).subscribe(returnValue => {
        if (returnValue === '0') {
          window.alert('No such user')
        } else {
          this.authService.setToken(returnValue);
          this.authService.setUser(this.validateForm.value.email);
          if (this.validateForm.value.remember) {
            this.authService.setPersistedCredentials(new PersistedCredentials(this.validateForm.value.email, this.validateForm.value.password, true));
          } else {
            this.authService.setPersistedCredentials(new PersistedCredentials());
          }
          this.router.navigate(['/projects/files-grid']);
        }
      });

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.cleanToken();
    const persistedCredentials = this.authService.getPersistedCredentials();
    const email = persistedCredentials.email;
    const password = persistedCredentials.password;
    const remember = persistedCredentials.remember;
    this.validateForm = this.fb.group({
      email: [email ? email : null, [Validators.email, Validators.required]],
      password: [password ? password : null, [Validators.required]],
      remember: [remember ? remember : true]
    });
  }

}
