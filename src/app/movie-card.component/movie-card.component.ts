/**
 *
 * Component responsible for displaying basic information
 * of all movies. Rendered as a routed view.
 * 
 *
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoritesServices } from '../favorite-movies.service/favorites';

/**
 * Displays details for all movies.
 *
 * Supports route-based navigation for rendering a a single movie view.
 * Provides actions for viewing a single movie card
 * and managing favorites.
 */

@Component({
  selector: 'app-movie-card.component',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})

export class MovieCardComponent implements OnInit{
  /**
   * Holds data for all movies.
   */
  movies: any[] = [];

  /**
   * Creates an instance of SingleMovieCardComponent.
   *
   * @param fetchApiData Service for API communication
   * @param snackBar Angular Material snackbar service
   * @param router Angular router for navigation
   * @param favorites Service managing favorite movies
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public favorites: FavoritesServices,
  ) {}
  
/**
 * Angular lifecycle hook called after component initialization.
 *
 * Loads the list of movies and initializes the user's
 * favorite movies.
 */

  ngOnInit(): void {
    this.getAllMovies();
    this.favorites.loadFavorites();  }

/**
 * Retrieves all movies from the backend.
 *
 * Updates the local movie list used for rendering
 * movie cards in the view.
 */

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

/**
 * Navigates to the detailed view of a selected movie.
 *
 * @param Title Title of the selected movie
 */

openSingleMovieCardComponent(Title: any): void {
    this.router.navigate(['/movies', Title]);
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
