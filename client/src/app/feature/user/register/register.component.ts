import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements AfterViewInit {
  isLoading = false;
  errors;
  form: FormGroup;

  constructor(private userService: UserService, private router: Router, private titleService: Title, private builder: FormBuilder) {
    const passwordControl = this.builder.control("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);

    this.form = builder.group({
      username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email]],
      password: passwordControl,
      repeatPassword: ["", [Validators.required, repeatPasswordValidator(passwordControl)]],
    });
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle("Register");
  };

  submitFormHandler(): void {
    this.isLoading = true;
    this.errors = [];

    this.userService.register(this.form.value).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.router.navigate(["/user/login"]);
      },
      error: (err) => {
        let messages = err.error?.errors || [err.error.message];
        Array.from(messages).forEach((el: any) => {
          this.errors.push(el.msg);
        });
        this.isLoading = false;

        this.form.get("password").setValue("");
        this.form.get("password").markAsUntouched();
        this.form.get("repeatPassword").setValue("");
        this.form.get("repeatPassword").markAsUntouched();
      }
    });
  };
}
