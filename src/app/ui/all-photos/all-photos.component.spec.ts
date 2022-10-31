import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';
import { AllPhotosComponent } from './all-photos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AllPhotosComponent', () => {
  let component: AllPhotosComponent;
  let fixture: ComponentFixture<AllPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPhotosComponent ],
      imports: [HttpClientModule, MatSnackBarModule, ScrollingModule, BrowserAnimationsModule],
      providers:[
        {provide: PhotosService}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit - should call getAllImages method', () => {
   const  getAllImagesSpy = spyOn(component, 'getAllImages').and.callThrough();
   component.ngOnInit()
   expect(getAllImagesSpy).toHaveBeenCalled();
  });

  it('#getAllImages - should push data to newImages array', () => {
    const photosService = TestBed.inject(PhotosService);
    spyOn(photosService, 'fetchImages').and.returnValue(throwError({url: 'https://images.unsplash.com/photo-1560806108-41a68051b9b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=50&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=50'}))
    component.getAllImages();
    fixture.detectChanges();
    expect(component.newImages.length).not.toBe(0);
   });

   it('#onImageClick - should push data to newImages array', () => {
    const mockData = {image: 'https://images.unsplash.com/photo-1560806108-41a68051b9b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=50&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=50', id: 'mockId'}
    const localStorageSpy = spyOn(localStorage, 'setItem')
    component.onImageClick(mockData);
    fixture.detectChanges();
    expect(component.selectedImageList).toEqual([mockData]);
    expect(localStorageSpy).toHaveBeenCalled();
   });

   it('#ngAfterViewInit - should display images of class image-area when elementScrolled returns value', fakeAsync(() => {
    component.ngAfterViewInit();
      fixture.detectChanges();
      const images = fixture.debugElement.queryAll(By.css('.image-area'));
      expect(images.length).not.toBeNull();
}));
});
