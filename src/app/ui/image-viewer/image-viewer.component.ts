import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  imageList:any[] = [];
  selectedImageDetails: string | any;
  selectedImage: string | any;

  constructor(private route: ActivatedRoute, private photosService: PhotosService, private router: Router, private snackBar: MatSnackBar) { 
    this.selectedImageDetails = this.route.snapshot.params;    
  }

  ngOnInit(): void {
    this.imageList = JSON.parse(localStorage.getItem('favorites') || '{}');
    this.getSelectedImage();
  }

onRemoveImageClick() {
  const removeIndex: number = this.imageList.findIndex(x => x.id === this.selectedImageDetails?.id);
  if (removeIndex !== -1) {
      this.imageList.splice(removeIndex, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(this.imageList));
  this.snackBar.open('Removed from favourites', '', {
    duration: 2000,
    verticalPosition: "bottom", 
    horizontalPosition: "center" 
  });
  this.router.navigate(['home/favorites']);
}

getSelectedImage() {
this.photosService.fetchImages(this.selectedImageDetails?.id).subscribe(res =>{},
  err => {
    this.selectedImage = err.url;
  });
}
}
