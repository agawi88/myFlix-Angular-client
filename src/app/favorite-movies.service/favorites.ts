import { Injectable } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesServices {

  favoriteMovies: any[] = [];

  constructor(
        private fetchApiData: FetchApiDataService,
  ) {}

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


  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.some(m => m._id === movieID);
  }

  add(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe(() => {
      this.loadFavorites();
    });
  }

  remove(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(
        m => m._id !== movieID
      );
    });
  }

  toggle(movieID: string): void {
    this.isFavorite(movieID)
      ? this.remove(movieID)
      : this.add(movieID);
  }
  

}