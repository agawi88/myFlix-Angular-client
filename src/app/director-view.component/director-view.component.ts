/**
 *
 * Dialog component responsible for updating an existing user's data.
 * Collects user's new credentials and submits them to the backend
 * via the FetchApiDataService.
 *
 */

import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Director view dialog component.
 *
 * Displays a dialog providing information 
 * on the chosen movie's director 
 * (Name, Bio, Date of Birth and Date if passing is applicable).
 * Future project is to add a movieCardView showing other movies
 * by this director.
 */

@Component({
  selector: 'app-director-view',
  standalone: false,
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorViewComponent {

/**
   * Local copy of movie and director data used inside the dialog.
   *
   */

    movie: any[] = [];
    director: any = {};

/**
 * Creates an instance of GenreViewComponent.
 *
 * @param data Data passed into the dialog from the parent component
 * @param dialogRef Reference to the active dialog instance
 * @param snackBar Angular Material snackbar service
 */
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { director: any, movie: any},
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DirectorViewComponent>,
  ) {}

    close(): void {
    this.dialogRef.close();
  }
}
