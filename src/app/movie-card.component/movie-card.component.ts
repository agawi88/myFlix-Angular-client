import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SingleMovieCardComponent } from '../single-movie-card.component/single-movie-card.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.getAllMovies();  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

/*   getSingleMovie(Title: string): void {
    this.fetchApiData.getSingleMovie(Title).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  } */

  addMovieToFavs(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
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

  // open dialog for the clicked movie — pass the actual movie object as dialog data
  openSingleMovieDialog(movie: any): void {
    this.dialog.open(SingleMovieCardComponent, {
      data: movie,
      width: '480px',
    });
  }
}
