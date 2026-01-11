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
      data: { director: director, movie: this.movie },
      width: '600px'
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { genre: genre, movie: this.movie },
      width: '400px'
    });
  }

/*   addMovieToFavs(movieID: string): void {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
     this.snackBar.open('You need to be logged in to add movies to favorites!', 'OK', {
        duration: 2000
     });
      return;
    }
    this.fetchApiData.addMovieToFavs(movieID).subscribe((resp: any) => {
      console.log(resp);

    isFavorite(movieID: string): boolean {
      const user = this.fetchApiData.getUser();
      return user.FavoriteMovies.includes(movieID);
    }
  }); */

  removeMovieFromFavs(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

}

