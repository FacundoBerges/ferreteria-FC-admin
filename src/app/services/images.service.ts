import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { ImageDTO } from '../interfaces/image-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private _API_URL: string = `${environment.apiUrl}/images`;
  private _httpClient: HttpClient = inject(HttpClient);

  public uploadImage(image: File): Observable<ImageDTO> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this._httpClient.post<ImageDTO>(this._API_URL, formData);
  }

  public getImageByName(fileName: string): Observable<Blob> {
    return this._httpClient.get(`${this._API_URL}/${fileName}`, { responseType: 'blob' });
  }
}
