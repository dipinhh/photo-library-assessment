import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPhotosComponent } from './all-photos.component';

const routes: Routes = [
  {
    path: '', component: AllPhotosComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPhotosRoutingModule { }
