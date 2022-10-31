import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';
import { ImageViewerComponent } from './image-viewer.component';

describe('ImageViewerComponent', () => {
  let component: ImageViewerComponent;
  let fixture: ComponentFixture<ImageViewerComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageViewerComponent ],
      imports: [HttpClientModule,
        RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule],
        providers:[
          {provide: PhotosService}
        ],
        schemas:[CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit - should call getSelectedImage method', () => {
    const getSelectedImageSpy = spyOn(component, 'getSelectedImage').and.callThrough();
    component.ngOnInit();
    expect(getSelectedImageSpy).toHaveBeenCalled();
  });

  it('#getSelectedImage - should push data to newImages array', () => {
    const photosService = TestBed.inject(PhotosService);
    const mockUrl = 'https://images.unsplash.com/photo-1560806108-41a68051b9b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=50&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=50'
    spyOn(photosService, 'fetchImages').and.returnValue(throwError({url: mockUrl, id: 'mockId'}))
    component.getSelectedImage();
    fixture.detectChanges();
    expect(component.selectedImage).toEqual(mockUrl);
   });

  it('#onRemoveImageClick - should remove the selected image from favorites and  navigate to favorites page', () => {
    const navigationSpy = spyOn(router, 'navigate');
    component.selectedImageDetails = {image: 'mockUrl', id: 'mockId'};
    component.imageList = [{image: 'mockUrl', id: 'mockId'}];
    component.onRemoveImageClick();
    expect(component.imageList.findIndex(ele => ele.id === component.selectedImageDetails.id)).toEqual(-1);
    expect(navigationSpy).toHaveBeenCalledWith(['home/favorites']);
  });
});
