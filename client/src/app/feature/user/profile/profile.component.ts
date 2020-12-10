import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/shared/interface/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean;
  currentUser: IUser;

  constructor(private userService: UserService, private titleService: Title) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.titleService.setTitle("Profile");
    this.currentUser = this.userService.getCurrentUser();
  }

}