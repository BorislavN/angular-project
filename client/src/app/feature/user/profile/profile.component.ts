import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  showEditForm: boolean;
  showTransferMenu: boolean;
  currentUser$: Observable<IUser>;
  refreshUser$: Observable<IUser>;

  constructor(private userService: UserService, private titleService: Title) {
    this.isLoading = true;
    this.showEditForm = false;
    this.showTransferMenu = false;
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.titleService.setTitle("Profile");
    this.currentUser$ = this.userService.getCurrentUser();
    this.refreshUser$ = this.userService.refreshCurrentUser();
  }

  toggleEditForm(): void {
    this.showEditForm = !(this.showEditForm);
  }

  toggleTransferMenu(): void {
    this.showTransferMenu = !(this.showTransferMenu);
  }
}