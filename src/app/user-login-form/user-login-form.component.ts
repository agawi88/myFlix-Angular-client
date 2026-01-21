/**
 *
 * Dialog component responsible for user login.
 * Collects user credentials and submits them to the backend for authentication
 * via the FetchApiDataService and navigation via routing.
 *
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // You'll use this import to close the dialog on success
import { FetchApiDataService } from '../fetch-api-data.service';  // This import brings in the API calls we created in 6.2
import { MatSnackBar } from '@angular/material/snack-bar';  // This import is used to display notifications back to the user
import { Router } from '@angular/router';

/**
 * User login dialog component.
 *
 * Displays a form that allows new users to log into an existing account
 * and handles submission and feedback and navigation via routing.
 */

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})

export class UserLoginFormComponent implements OnInit {

  /**
   * Holds user input data for registration.
   */

  @Input() userData = { Username: '', Password: '' };
  
  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param fetchApiData Service for API communication
   * @param dialogRef Reference to the active dialog instance
   * @param snackBar Angular Material snackbar service
   * @param router Angular router for navigation
   */  

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void {
    }

  /**
   * Submits the login form data to the backend.
   *
   * On success, the dialog is closed and a confirmation
   * message is displayed to the user and the user is redirected to the main MovieCardComponent.
   */
  
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
     this.dialogRef.close(); 
     console.log(response);
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
     this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
