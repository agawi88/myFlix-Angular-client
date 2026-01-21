/**
 *
 * Dialog component responsible for updating an existing user's data.
 * Collects user's new credentials and submits them to the backend
 * via the FetchApiDataService.
 *
 * @module GenreViewComponent
 */

import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Genre view dialog component.
 *
 * Displays a dialog providing information 
 * on the chosen movie's genre and the genre's description.
 * Future project is to add a movieCardView showing other movies
 * with this genre.
 */

@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent {

/**
   * Local copy of movie and genre data used inside the dialog.
   *
   */

  movie: any = {};
  genre: any = {};

/**
 * Creates an instance of GenreViewComponent.
 *
 * @param data Data passed into the dialog from the parent component
 * @param dialogRef Reference to the active dialog instance
 * @param snackBar Angular Material snackbar service
 */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: any, movie: any},
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenreViewComponent>,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}