import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view.component/director-view.component';
import { GenreViewComponent } from '../genre-view.component/genre-view.component';

@Component({
  selector: 'app-single-movie-card.component',
  standalone: false,
  templateUrl: './single-movie-card.component.html',
  styleUrl: './single-movie-card.component.scss',
})
export class SingleMovieCardComponent implements OnInit {

  movie: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  const movieTitle = this.route.snapshot.paramMap.get('Title');

  if (movieTitle) {
    this.getSingleMovie(movieTitle);
  }
}

  getSingleMovie(movieTitle: string): any {
    this.fetchApiData.getSingleMovie(movieTitle).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.movie;
    });
  }

      goBack(): void {
    this.router.navigate(['/movies']);
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorViewComponent, {
      data: { director },
      width: '400px'
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { genre: movie.genre },
      width: '400px'
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
    });
  }

  removeMovieFromFavs(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

}

