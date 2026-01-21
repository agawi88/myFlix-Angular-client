/**
 *
 * This is the first page users view upon opening my app and the one shown after a user loggs out. 
 * Page visible to both registered and un-registered users.
 * * This component uses dialogs, authentication-aware
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Welcome page component.
 *
 * Displays two buttons for opening a Sign-in and Log-in dialogs.
 * Both actions are based on authentication state.
 */

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {

    /**
   * Creates an instance of NavigationToolbarComponent.
   *
   * @param dialog Angular Material dialog service
   */
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

    /**
   * Opens a dialog with registration form allowing a potential user to register an account necessary for viewing the app's content.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '300px'
    });
  }

  /**
   * Opens a dialog with login form allowing an existing user to view the app's content.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '300px'
    });
  }

}
