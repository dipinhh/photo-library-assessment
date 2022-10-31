import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime, timer } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss'],
})
export class AllPhotosComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport | any;
  imageList:any[] = [];
  loading = false;
  selectedImageList:any[] = [];
  newImages:any[] = [];
  constructor(private ngZone: NgZone, private photosService: PhotosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([a, b]) => (b < a && b < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getAllImages();
      });
    }
    );
  }
  
  getAllImages(): void {
    const images = ['IuLgi9PWETU', 'fIq0tET6llw', 'xcBWeU4ybqs', 'YW3F-C5e8SE', 'H90Af2TFqng'];
    for (let i = 0; i < 20; i++) {
      const randomPhotoId = Math.round(Math.random() * 4);
      this.photosService.fetchImages(images[randomPhotoId]).subscribe(res => {
      }, error => {        
          this.newImages.push({
          image: error?.url,
          id:images[randomPhotoId]
        });
        }
      )
    }

    this.loading = true;
    timer(1000).subscribe(() => {
      this.loading = false;
      this.imageList = [...this.imageList, ...this.newImages];
    });
  }

  onImageClick (selectedImage: {image: string, id: string}) {
    let getExistingFavorites:any[] = [];
   getExistingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.selectedImageList = [...this.selectedImageList, ...getExistingFavorites]
      const removeIndex: number = this.selectedImageList.findIndex(x => x.id === selectedImage?.id);
      if (removeIndex === -1) {
        this.selectedImageList.push(selectedImage);
        this.snackBar.open('Added to favorites', '', {
          duration: 2000,
          verticalPosition: "bottom", 
          horizontalPosition: "center" 
        });
        const newArr: any[] = []
this.selectedImageList.forEach((item, index) => {
    if (newArr.findIndex(i => i.id == item.id) === -1) 
    {
        newArr.push(item)
    }
});
this.selectedImageList = newArr;
        localStorage.setItem('favorites', JSON.stringify(this.selectedImageList));
      }
    else {

      this.snackBar.open('Image already added in favorites', '', {
        duration: 2000,
        verticalPosition: "bottom", 
        horizontalPosition: "center" 
      });
    }
  }
}
