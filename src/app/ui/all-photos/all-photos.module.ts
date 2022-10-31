import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPhotosComponent } from './all-photos.component';
import { AllPhotosRoutingModule } from './all-photos-routing.module';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [AllPhotosComponent],
  imports: [
    CommonModule,
    AllPhotosRoutingModule,
    SharedModule
    ]
})
export class AllPhotosModule { }
