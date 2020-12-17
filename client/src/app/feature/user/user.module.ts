import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfferListComponent } from './offer-list/offer-list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit-menu/edit-menu.component';
import { TransferMenuComponent } from './transfer-menu/transfer-menu.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, OfferListComponent, ProfileComponent, EditComponent, TransferMenuComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
