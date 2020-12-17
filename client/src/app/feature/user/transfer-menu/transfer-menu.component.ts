import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interface/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-transfer-menu',
  templateUrl: './transfer-menu.component.html',
  styleUrls: ['./transfer-menu.component.css']
})
export class TransferMenuComponent {
  @Input("balance") currentBalance: Number;
  @Output() onCloseTransferMenu = new EventEmitter<boolean>();

  tooBig: boolean;
  formLoading: boolean;
  form: FormGroup;

  constructor(private userService: UserService, private builder: FormBuilder, private router: Router) {
    this.formLoading = false;

    this.form = this.builder.group({
      action: ["deposit", [Validators.pattern("deposit|withdraw")]],
      transaction: ["", [Validators.required, Validators.min(1), Validators.max(3000000)]]
    });
  }

  closeTransferMenu(): void {
    this.onCloseTransferMenu.emit(true);
  }

  private transfer(method$: Observable<IUser>): void {
    method$.subscribe({
      next: (result) => {
        this.formLoading = false;
        this.closeTransferMenu();
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
      }
    });
  }

  submitFormHandler(): void {
    this.formLoading = true;
    this.tooBig = false;

    const { action, transaction } = this.form.value

    if ("deposit" === action) {
      this.transfer(this.userService.deposit({ transaction }));
      
    } else {
      if (transaction > this.currentBalance) {
        this.tooBig = true;
        this.formLoading = false;

      } else {
        this.transfer(this.userService.withdraw({ transaction }));
      }
    }
  }
}
