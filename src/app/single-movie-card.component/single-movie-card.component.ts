/**
 *
 * Component responsible for displaying detailed information
 * about a single movie. It can be rendered either as a
 * routed view or inside an Angular Material dialog.
 *
 * @module SingleMovieCardComponent
 */

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view.component/director-view.component';
import { GenreViewComponent } from '../genre-view.component/genre-view.component';
import { FavoritesServices } from '../favorite-movies.service/favorites';

/**
 * Displays details for a single movie.
 *
 * Supports both route-based navigation and dialog-based
 * rendering. Provides actions for viewing related
 * director and genre information and managing favorites.
 */

@Component({
  selector: 'app-single-movie-card.component',
  standalone: false,
  templateUrl: './single-movie-card.component.html',
  styleUrl: './single-movie-card.component.scss',
})
export class SingleMovieCardComponent implements OnInit {
 
  /**
   * Holds the currently displayed movie data.
   */

  movie: any = {};

  /**
   * Creates an instance of SingleMovieCardComponent.
   *
   * @param dialogRef Optional reference when component is opened as a dialog
   * @param data Optional dialog data containing a movie object
   * @param fetchApiData Service for API communication
   * @param dialog Angular Material dialog service
   * @param snackBar Angular Material snackbar service
   * @param route Activated route used for retrieving URL parameters
   * @param router Angular router for navigation
   * @param favorites Service managing favorite movies
   */

  constructor(

    @Optional() public dialogRef: MatDialogRef<SingleMovieCardComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public favorites: FavoritesServices,
  ) {
    /* If the dialog injected data includes a movie, use it; otherwise leave existing this.movie */
    this.movie = data?.movie || this.movie;
  }

  /**
   * Angular lifecycle hook called after component initialization.
   *
   * Retrieves movie data from the route when navigated
   * via URL and initializes the favorites list.
   */

  ngOnInit(): void {
  const movieTitle = this.route.snapshot.paramMap.get('Title');

  if (movieTitle) {
    this.getSingleMovie(movieTitle);
    this.favorites.loadFavorites();
  }
}

  /**
   * Retrieves movie details by title.
   *
   * @param movieTitle Title of the movie to retrieve
   */

  getSingleMovie(movieTitle: string): any {
    this.fetchApiData.getSingleMovie(movieTitle).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.movie;
    });
  }

  /**
   * Navigates back to the previous view.
   *
   * Closes the dialog when opened as a dialog,
   * otherwise navigates back to the movie list.
   */

  goBack(): void {
        if (this.dialogRef) {
      // Opened as dialog
      this.dialogRef.close();
    } else {
      // Opened via routing
      this.router.navigate(['/movies']);
    }
  }

  /**
   * Opens a dialog displaying director information.
   *
   * @param director Director data associated with the movie
   */

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorViewComponent, {
      data: { director: director, movie: this.movie },
      width: '600px'
    });
  }

  /**
   * Opens a dialog displaying genre information.
   *
   * @param genre Genre data associated with the movie
   */

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { genre: genre, movie: this.movie },
      width: '400px'
    });
  }

  /**
   * Checks whether a movie is marked as a favorite.
   *
   * @param movieID Movie identifier
   * @returns `true` if the movie is a favorite
   */

  isFavorite(movieID: string): boolean {
  return this.favorites.isFavorite(movieID);
}

  /**
   * Toggles the favorite status of a movie.
   *
   * @param movieID Movie identifier
   */
  
  toggle(movieID: string): void {
  this.favorites.toggle(movieID);
}

}

  