import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostDatePipe } from '../pipes/post-date.pipe';



@NgModule({
  declarations: [
    PostDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    PostDatePipe
  ]
})
export class SharedModule { }
