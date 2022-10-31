import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerRoutingModule } from './image-viewer-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [ImageViewerComponent],
  imports: [
    CommonModule,
    ImageViewerRoutingModule,
    SharedModule
  ]
})
export class ImageViewerModule { }
