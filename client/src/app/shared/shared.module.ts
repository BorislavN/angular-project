import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './spinner/loading/loading.component';
import { BaseContentComponent } from './base-content/base-content.component';
import { DateAgoPipe } from './util/date-ago.pipe';



@NgModule({
  declarations: [LoadingComponent, BaseContentComponent, DateAgoPipe],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent,BaseContentComponent,DateAgoPipe]
})
export class SharedModule { }
