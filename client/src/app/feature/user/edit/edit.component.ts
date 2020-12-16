import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interface/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editFormLoading: boolean;
  form: FormGroup;
  errors: String[];
  @Input("info") user: IUser;
  @Output() onCloseForm = new EventEmitter<boolean>();
  // @Output() onEditedData = new EventEmitter<{ username: String, email: String }>();

  constructor(private userService: UserService, private builder: FormBuilder) {
    this.editFormLoading = false;
    this.errors = [];
  }

  toggleForm(): void {
    this.onCloseForm.emit(true);
  }

  // private sendEditedData(data: { username: String, email: String }): void {
  //   this.onEditedData.emit(data);
  // }

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
        // this.sendEditedData({ "username": result.username, "email": result.email });
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