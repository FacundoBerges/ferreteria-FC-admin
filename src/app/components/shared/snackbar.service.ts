import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _snackbar: MatSnackBar = inject(MatSnackBar);

  constructor() {}

  public showSnackbar(message: string, action: string = 'Ok', duration: number = 5000): void {
    this._snackbar.open(message, action, {
      duration: duration,
    });
  }
}
