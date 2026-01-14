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

  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    public favorites: FavoritesServices,
  ) { }
  // holds the user object returned from the API
  userData: any | null = null;
  username: string = '';
  // optional: list of favorite movies for display
  favoriteMovies: any[] = [];
  movies: any[] = [];

  ngOnInit(): void {
    // load the current user's data when the profile component initializes
    this.getUserDetails();
    this.favorites.loadFavorites();

  }

  getUserDetails(): void {
    // The service reads the logged-in Username from localStorage, so we don't pass any input here
    this.fetchApiData.getUserDetails().subscribe((resp) => {
      console.log('getUserDetails response', resp);
      this.userData = resp;
      // if the API returns favorite movies inside the user object, copy them for easy iteration
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

  openDeleteDialog(templateRef: TemplateRef<any>): void {
  this.dialog.open(templateRef);
}

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

    goBackToMovies(): void {
    this.router.navigate(['/movies']);
  }

    openMovieDialog(movie: any): void {
      this.dialog.open(SingleMovieCardComponent, {
        data: { movie: movie },
        width: '600px'
      });
    }

}
