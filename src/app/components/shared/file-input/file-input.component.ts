import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'admin-file-input',
  imports: [MatIconModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  standalone: true,
})
export class FileInputComponent {
  @Input() public accept: string | string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  @Output() public fileSelected = new EventEmitter<File>();
  @Output() public fileCancelled = new EventEmitter<File>();
  public fileName?: string = '';

  public onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput.files;

    if (!fileList || fileList.length === 0) {
      this._resetFileName();
      this.fileCancelled.emit();
      return;
    }

    const file: File = fileList[0];

    if (this.accept === 'image/*' && !this._isValidFile(file)) {
      this._resetFileName();
      this.fileCancelled.emit();
      throw new Error('Invalid file type');
    }

    this.fileName = file.name;
    this.fileSelected.emit(file);
  }

  get inputAccept(): string {
    if (Array.isArray(this.accept)) 
      return this.accept.join(',');
    
    return this.accept;
  }

  private _resetFileName(): void {
    this.fileName = undefined;
  }

  private _isValidFile(file: File): boolean {
    if (Array.isArray(this.accept)) 
      return this.accept.includes(file.type);
    
    return file.type.startsWith(this.accept);
  }
}
