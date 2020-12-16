import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interface/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean;
  inForm: boolean;
  showEditForm: boolean;
  tooBig: boolean;
  formLoading: boolean;
  currentUser$: Observable<IUser>;
  form: FormGroup;

  constructor(private userService: UserService, private titleService: Title, private builder: FormBuilder, private router: Router) {
    this.isLoading = true;
    this.inForm = false;
    this.showEditForm = false;
    this.formLoading = false;

    this.form = this.builder.group({
      action: ["deposit", [Validators.pattern("deposit|withdraw")]],
      transaction: ["", [Validators.required, Validators.min(1), Validators.max(3000000)]]
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.titleService.setTitle("Profile");
    this.currentUser$ = this.userService.getCurrentUser();
  }

  toggleForm(): void {
    this.inForm = !(this.inForm);
  }

  private transfer(method$: Observable<IUser>): void {
    method$.subscribe({
      next: (result) => {
        this.inForm = false;
        this.formLoading = false;
        this.form.get("transaction").reset();
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
      }
    });
  }

  submitFormHandler(balance: number): void {
    this.formLoading = true;
    this.tooBig = false;

    const { action, transaction } = this.form.value

    if ("deposit" === action) {
      this.transfer(this.userService.deposit({ transaction }));

    } else {
      if (transaction > +balance) {
        this.tooBig = true;
        this.formLoading = false;

      } else {
        this.transfer(this.userService.withdraw({ transaction }));
      }
    }
  }

  toggleEditForm(): void {
    this.showEditForm = true;
  }

  hideEditForm(value: boolean): void {
    if (value) {
      this.showEditForm = false;
    }
  }

  // updateProfileData(data: { "username": String, "email": String }): void {
  //   this.currentUser.username = data.username;
  //   this.currentUser.email = data.email;
  // }
}