/**
 *
 * Dialog component responsible for updating an existing user's data.
 * Collects user's new credentials and submits them to the backend
 * via the FetchApiDataService.
 *
 */

import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * User form dialog component.
 *
 * Displays a form that allows existing users to update their data
 * and handles submission and feedback.
 */

@Component({
  selector: 'app-user-form-dialog.component',
  standalone: false,
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
})
export class UserFormDialogComponent {

/**
   * Local copy of user data used inside the dialog.
   *
   * Cloned from injected dialog data to prevent
   * unintended mutation of parent component state.
   */

  userData: any

/**
 * Creates an instance of UserFormDialogComponent.
 *
 * @param data Data passed into the dialog from the parent component
 * @param dialogRef Reference to the active dialog instance
 * @param fetchApiData Service for API communication
 * @param snackBar Angular Material snackbar service
 */

    constructor(  
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,

  ) {
    this.userData = { ...data.userData };
  }

  /**
   * Submits the edited user data form to the backend.
   *
   * On success, the dialog is closed, user's data displayed in user's profile are updated and a confirmation
   * message is displayed to the user.
   */

  editUser(): void {
      this.fetchApiData.editUserDetails(this.userData).subscribe({
        next: (updatedUser) => {
          localStorage.setItem('user', updatedUser.Username);
          this.snackBar.open('User edited successfully!', 'OK', {
            duration: 2000
          });
          this.dialogRef.close(updatedUser);  
        },
        error: (err) => {
          this.snackBar.open(err?.message, 'OK', {
            duration: 2000
          });
        }
      });
    }

}
