import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'admin-file-input',
  imports: [MatIconModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  standalone: true,
})
export class FileInputComponent {
  fileName: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.fileName = file ? file.name : '';
  }
}
