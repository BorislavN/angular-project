import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './spinner/loading/loading.component';
import { BaseContentComponent } from './base-content/base-content.component';



@NgModule({
  declarations: [LoadingComponent, BaseContentComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent,BaseContentComponent]
})
export class SharedModule { }
