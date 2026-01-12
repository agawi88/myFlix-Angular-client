import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view.component/director-view.component';
import { GenreViewComponent } from '../genre-view.component/genre-view.component';
import { FavoritesServices } from '../favorite-movies.service/favorites';

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
    private router: Router,
    public favorites: FavoritesServices,
  ) {}

  ngOnInit(): void {
  const movieTitle = this.route.snapshot.paramMap.get('Title');

  if (movieTitle) {
    this.getSingleMovie(movieTitle);
    this.favorites.loadFavorites();
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

  isFavorite(movieID: string): boolean {
  return this.favorites.isFavorite(movieID);
}

  toggle(movieID: string): void {
  this.favorites.toggle(movieID);
}



}