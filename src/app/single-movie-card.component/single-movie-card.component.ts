import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-single-movie-card.component',
  standalone: false,
  templateUrl: './single-movie-card.component.html',
  styleUrl: './single-movie-card.component.scss',
})
export class SingleMovieCardComponent {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public movie: any,
  ) {}
  
/*   getSingleMovie(Title: string): void {
    this.fetchApiData.getSingleMovie(Title).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  } */

/*   getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

  getGenre(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  } */

  addMovieToFavs(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
/*       localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token); */
     this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
     });
    });
  }

  removeMovieFromFavs(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

}

