/**
 *
 * Provides the navigation toolbar component for the application.
 * This component handles navigation actions, authentication-aware
 * UI behavior, and user session management.
 *
 */

import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { OnInit } from '@angular/core';

/**
 * Navigation toolbar component.
 *
 * Displays the application toolbar and provides
 * navigation actions based on authentication state.
 */

@Component({
  selector: 'app-navigation-toolbar',
  standalone: false,
  templateUrl: './navigation-toolbar.component.html',
  styleUrl: './navigation-toolbar.component.scss',
})

export class NavigationToolbarComponent implements OnInit {

  /**
   * Creates an instance of NavigationToolbarComponent.
   *
   * @param fetchApiData Service for API communication
   * @param dialog Angular Material dialog service
   * @param snackBar Angular Material snackbar service
   * @param router Angular router for navigation
   */

    constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Angular lifecycle hook that is called
   * after component initialization.
   */
  ngOnInit(): void { 
  }

  /**
   * Determines whether a user is currently logged in.
   *
   * @returns `true` if an authentication token exists, otherwise `false`
   */

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  /**
   * Checks whether the current route is the welcome page.
   *
   * @returns `true` if the user is on the welcome page
   */

  isWelcomePage(): boolean {
    return this.router.url === '/welcome' || this.router.url === '/';
  }

  /**
   * Navigates to the currently logged-in user's profile page.
   */

  openUserProfile(): void {
    this.router.navigate(['/users', localStorage.getItem('user')]);
  }

  /**
   * Logs out the current user, clears local storage,
   * and redirects to the welcome page.
   */

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out', 'OK', { duration: 2000 });
    console.log('Logging out');
  }

}

