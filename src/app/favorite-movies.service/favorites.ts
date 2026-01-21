/**
 *
 * Service responsible for managing the user's favorite movies.
 * Maintains a local cache of favorite movies and synchronizes
 * changes with the backend API.
 *
 */

import { Injectable } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Manages favorite movie state for the application.
 *
 * Provides methods for loading, checking, adding,
 * removing, and toggling favorite movies.
 */

@Injectable({
  providedIn: 'root',
})
export class FavoritesServices {

  /**
   * Local cache of the user's favorite movies.
   */

  favoriteMovies: any[] = [];

  /**
   * Creates an instance of FavoritesServices.
   *
   * @param fetchApiData Service for API communication
   */

  constructor(
        private fetchApiData: FetchApiDataService,
  ) {}

  /**
   * Loads the user's favorite movies from the backend.
   *
   * Updates the local favorite movie cache.
   */

  loadFavorites(): void {
    this.fetchApiData.getUserFavMovies().subscribe({
      next: movies => {
      this.favoriteMovies = movies;
    },
      error: err => {
        console.error('Failed to load favorite movies', err);
      }
    });
  }

  /**
   * Checks whether a movie is marked as a favorite.
   *
   * @param movieID Movie identifier
   * @returns `true` if the movie is a favorite
   */

  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.some(m => m._id === movieID);
  }

  /**
   * Adds a movie to the user's favorites.
   *
   * @param movieID Movie identifier
   */  

  add(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe(() => {
      this.loadFavorites();
    });
  }

  /**
   * Removes a movie from the user's favorites.
   *
   * @param movieID Movie identifier
   */  

  remove(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(
        m => m._id !== movieID
      );
    });
  }

  /**
   * Toggles the favorite status of a movie.
   *
   * Adds the movie to favorites if it is not currently
   * marked as a favorite, otherwise removes it.
   *
   * @param movieID Movie identifier
   */  

  toggle(movieID: string): void {
    this.isFavorite(movieID)
      ? this.remove(movieID)
      : this.add(movieID);
  }
  

}