import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { repeatPasswordValidator } from 'src/app/shared/validator/validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false;
  errorMessage = '';
  form: FormGroup;

  constructor(private userService: UserService, private router: Router, private titleService: Title, private builder: FormBuilder) {
    const passwordControl = this.builder.control("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);

    this.form = builder.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email]],
      password: passwordControl,
      repeatPassword: ["", [Validators.required, repeatPasswordValidator(passwordControl)]],
    });
    this.titleService.setTitle("Register");
  };

  submitFormHandler(): void {
    console.log(this.form.value);

    // formValue: { username: string, email: string, password: string, repeatPassword: string }
    // this.isLoading = true;
    // this.errorMessage = '';

    // this.userService.register(formValue).subscribe({
    //   next: (data) => {
    //     this.isLoading = false;
    //     this.router.navigate(["/user/login"]);
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error.message;
    //     this.isLoading = false;
    //   }
    // });
  };
}
