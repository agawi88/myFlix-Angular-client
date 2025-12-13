import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card.component',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit{

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<MovieCardComponent>
  ) {}
  
  ngOnInit(): void {
    this.getAllMovies();
   // this.getUserDetails();
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getSingleMovie(Title: string): void {
    this.fetchApiData.getSingleMovie(Title).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

  getDirector(directorName: string): void {
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
  }

  addMovieToFavs(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
/*       localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token); */
     this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
     });
     //this.router.navigate(['favorites']);
    });
  }

  removeMovieFromFavs(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

/*   getUserDetails(): void {
    this.fetchApiData.getUserDetails().subscribe((resp: any) => {
     this.dialogRef.close(); // This will close the modal on success!
     console.log(resp);
      localStorage.setItem('user', resp.user.Username);
      localStorage.setItem('token', resp.token);
     this.snackBar.open('User Profile accessed successfully!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['profile']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });    });
  } */

}
