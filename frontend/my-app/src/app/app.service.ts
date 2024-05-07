import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  uploadChunk(chunk: ArrayBuffer, index: number, fileSize: number) {
    const formData = new FormData();
    formData.append('chunk', new Blob([chunk]), 'chunk_' + index);
    formData.append('index', index.toString());
    formData.append('fileSize', fileSize.toString());

    return this.http.post<any>('http://localhost:4000/uploadChunk', formData);
  }
}
