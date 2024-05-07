import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uploader-angular';
  private _value: number = 0;
  file: File;
  message: string;

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    if (!isNaN(value) && value <= 100) {
      this._value = value;
    }
  }

  constructor(private app: AppService) {}

  upload(file: File): void {
    const chunkSize = 1024 * 1024;
    const fileSize = file.size;
    let start = 0;
    let end = Math.min(chunkSize, fileSize);
    let chunkIndex = 0;

    const reader = new FileReader();

    const uploadChunk = () => {
      const chunk = file.slice(start, end);
      reader.readAsArrayBuffer(chunk);
    };

    reader.onload = () => {
      this.app.uploadChunk(reader.result as ArrayBuffer, chunkIndex, Math.min(end, fileSize)).subscribe(
        (res) => {
          chunkIndex++;

          start = end;
          end = Math.min(start + chunkSize, fileSize);

          if (start < fileSize) {
            uploadChunk();
            this.value = Math.round((start / fileSize) * 100);
          } else {
            this.value = 100;
            this.message = 'Upload complete';
          }
        },
        (error) => {
          console.error('Chunk upload failed:', error);
        }
      );
    };

    uploadChunk();
  }
}
