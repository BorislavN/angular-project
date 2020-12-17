import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interface/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditComponent implements OnInit {
  @Input("info") user: IUser;
  @Output() onCloseForm = new EventEmitter<boolean>();

  editFormLoading: boolean;
  form: FormGroup;
  errors: String[];
 
  constructor(private userService: UserService, private builder: FormBuilder) {
    this.editFormLoading = false;
    this.errors = [];
  }

  toggleForm(): void {
    this.onCloseForm.emit(true);
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  submitFormHandler(): void {
    this.editFormLoading = true;

    this.userService.updateProfile(this.form.value).subscribe({
      next: (result) => {
        this.editFormLoading = false;
        this.toggleForm();
      },
      error: (err) => {
        let messages = err.error?.errors || [err.error.message];
        Array.from(messages).forEach((el: any) => {
          this.errors.push(el?.msg || el);
        });
        this.editFormLoading = false;
      }
    });
  }
}