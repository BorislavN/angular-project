import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './spinner/loading/loading.component';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent]
})
export class SharedModule { }
