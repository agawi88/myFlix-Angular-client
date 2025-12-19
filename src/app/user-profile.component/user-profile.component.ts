import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {

  constructor(
    public fetchApiData: FetchApiDataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }
  // holds the user object returned from the API
  userData: any | null = null;
  username: string = '';
  // optional: list of favorite movies for display
  favoriteMovies: any[] = [];

  ngOnInit(): void {
    // load the current user's data when the profile component initializes
    this.getUserDetails();
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

/*   closeDialog(): void {
    this.dialogRef.close();
  } */

    goBack(): void {
    this.router.navigate(['/movies']);
  }
}
