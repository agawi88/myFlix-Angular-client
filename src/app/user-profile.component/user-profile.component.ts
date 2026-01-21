/**
 * User profile component.
 *
 * Displays and manages the currently logged-in user's
 * profile information, including favorite movies,
 * account updates, and account deletion.
 */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FavoritesServices } from '../favorite-movies.service/favorites';
import { SingleMovieCardComponent } from '../single-movie-card.component/single-movie-card.component';
import { UserFormDialogComponent } from '../user-form-dialog.component/user-form-dialog.component';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {

  /**
   * Creates an instance of UserProfileComponent.
   *
   * @param fetchApiData Service for API communication
   * @param dialog Angular Material dialog service
   * @param snackBar Angular Material snackbar service
   * @param router Angular router for navigation
   * @param favorites Service managing favorite movies
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    public favorites: FavoritesServices,
  ) { }
  /**
   * Holds the current user's profile data.
   */
  
  userData: any | null = null;

    /**
   * Username of the logged-in user.
   */

  username: string = '';

  /**
   * List of the user's favorite movies.
   */  
  favoriteMovies: any[] = [];

    /**
   * Collection of movies available to the user.
   */

  movies: any[] = [];

  /**
   * Angular lifecycle hook called after component initialization.
   *
   * Loads the user's profile data and favorite movies.
   */

  ngOnInit(): void {
    this.getUserDetails();
    this.favorites.loadFavorites();

  }

  /**
   * Retrieves the currently logged-in user's profile details.
   *
   * Updates local state with user information and favorite movies.
   */

  getUserDetails(): void {
    this.fetchApiData.getUserDetails().subscribe((resp) => {
      console.log('getUserDetails response', resp);
      this.userData = resp;
      this.favoriteMovies = resp?.FavoriteMovies || [];
      this.snackBar.open('User Profile accessed successfully!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('getUserDetails error', error);
      this.snackBar.open(error?.message || 'Failed to load profile', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Opens a dialog for editing user profile information.
   *
   * Updates local user data after successful dialog submission.
   */

  openEditDialog(): void {
  const dialogRef = this.dialog.open(UserFormDialogComponent, {
    width: '500px',
    data: { userData: this.userData }
  });

  dialogRef.afterClosed().subscribe((updatedUser) => {
    if (updatedUser) {
      this.userData = updatedUser;
      this.favoriteMovies = updatedUser.FavoriteMovies || [];
    }
  });
}

  /**
   * Opens a confirmation dialog for account deletion.
   *
   * @param templateRef Template reference used for confirmation UI
   */

  openDeleteDialog(templateRef: TemplateRef<any>): void {
  this.dialog.open(templateRef);
}

  /**
   * Deletes the current user's account.
   *
   * Redirects the user to the welcome page on success.
   */

  deleteUser(): void {
    this.fetchApiData.deleteUserAccount().subscribe((resp) => {
      console.log('deleteUser response', resp);
      this.snackBar.open('Profile deleted successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['/']);
    }, (error) => {
      console.error('deleteUser error', error);
      this.snackBar.open(error?.message || 'Failed to delete profile', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Navigates back to the movie list view.
   */

    goBackToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Opens a dialog displaying details for a selected movie.
   *
   * @param movie Movie data to display
   */
  
  
    openMovieDialog(movie: any): void {
      this.dialog.open(SingleMovieCardComponent, {
        data: { movie: movie },
        width: '600px'
      });
    }

}
