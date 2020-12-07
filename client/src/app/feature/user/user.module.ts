import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
