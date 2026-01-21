/**
 *
 * Dialog component responsible for user registration.
 * Collects user credentials and submits them to the backend
 * via the FetchApiDataService.
 *
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * User registration dialog component.
 *
 * Displays a form that allows new users to register
 * and handles submission and feedback.
 */

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Holds user input data for registration.
   */

  @Input() userData = { 
    Username: '', 
    Password: '', 
    Email: '', 
    DateOfBirth: '' 
  };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param fetchApiData Service for API communication
   * @param dialogRef Reference to the active dialog instance
   * @param snackBar Angular Material snackbar service
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    }

  /**
   * Submits the registration form data to the backend.
   *
   * On success, the dialog is closed and a confirmation
   * message is displayed to the user.
   */
  
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
     this.dialogRef.close();
     console.log(result);
     this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
