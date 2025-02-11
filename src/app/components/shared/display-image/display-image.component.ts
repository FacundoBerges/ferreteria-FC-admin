import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'admin-display-image',
  templateUrl: './display-image.component.html',
  styleUrl: './display-image.component.scss',
  imports: [],
})
export class DisplayImageComponent implements OnInit, OnChanges, OnDestroy {
  private _imageSource?: string;
  @Input() public image?: Blob;

  ngOnInit(): void {
    this._loadImageSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['image']) {
      this._loadImageSource();
    }
  }

  ngOnDestroy(): void {
    this._revokeImageSource();
  }

  get imageSource(): string {
    return this._imageSource ?? '';
  }

  private _loadImageSource(): void {
    if (!this.image) {
      this._imageSource = undefined;
      return;
    }

    this._imageSource = URL.createObjectURL(this.image!);
  }

  private _revokeImageSource(): void {
    if (this._imageSource) URL.revokeObjectURL(this._imageSource!);
  }
}
