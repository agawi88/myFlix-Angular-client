import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form-dialog.component',
  standalone: false,
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
})
export class UserFormDialogComponent {

  userData: any

    constructor(  
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,

  ) {
    this.userData = { ...data.userData };  // IMPORTANT: clone to avoid mutating parent state
  }

  /* This is the function responsible for sending the form inputs to the backend */

  editUser(): void {
      this.fetchApiData.editUserDetails(this.userData).subscribe({
        next: (updatedUser) => {
          localStorage.setItem('user', updatedUser.Username);
          this.snackBar.open('User edited successfully!', 'OK', {
            duration: 2000
          });
          this.dialogRef.close(updatedUser);     // Close the dialog on success
        },
        error: (err) => {
          this.snackBar.open(err?.message, 'OK', {
            duration: 2000
          });
        }
      });
    }

}
