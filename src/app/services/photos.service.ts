import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private _http: HttpClient) { }

  fetchImages(randomPhotoId: any): Observable<any> {
return this._http.get(`${environment.url}${randomPhotoId}/50x50`)
  }
}

