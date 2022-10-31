import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpTestingController: HttpTestingController;

  beforeEach(async() => {
   await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [{
        provide: PhotosService
      }]
    }).compileComponents();
    service = TestBed.inject(PhotosService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchImages - should return an Observable<any> containing images', () => {
    const randomPhotoId = 'fIq0tET6llw'
    service.fetchImages(randomPhotoId).subscribe(res => {
      expect(res).not.toBeNull();
    });
const req = httpTestingController.expectOne('https://source.unsplash.com/fIq0tET6llw/50x50')
expect(req.request.method).toBe('GET')  
  });
});
