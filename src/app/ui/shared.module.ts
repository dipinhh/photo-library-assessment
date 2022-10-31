import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  exports:[
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ]
})
export class SharedModule { }
