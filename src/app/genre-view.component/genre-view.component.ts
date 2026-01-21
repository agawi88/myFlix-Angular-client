import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent {

  movie: any = {};
  genre: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: any, movie: any},
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenreViewComponent>,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}