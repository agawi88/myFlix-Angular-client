/* import { Injectable } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from '../movie-card.component/movie-card.component';


@Injectable({
  providedIn: 'root',
})

export class FavoriteMoviesService {

  favoriteMovies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService,
              public snackBar: MatSnackBar,
              public movieCard: MovieCardComponent,

  ) { }

    getUserFavMovies(): void {
    this.fetchApiData.getUserFavMovies().subscribe( movies => {
      this.favoriteMovies = movies;
      console.log(movies);
      return movies;
    });
  }
    isFavorite(movieID: string): boolean {
    return this.favoriteMovies.includes(movieID);
  }

  addMovieToFavs(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe((resp: any) => {
      this.favoriteMovies.push(resp);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000
      });
      console.log(resp);
      return resp;
    }
);
  }
  removeMovieFromFavs(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe((resp: any) => {
      this.favoriteMovies = this.favoriteMovies.filter(
        movie => movie._id !== movieID);
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
      console.log(resp);
      return resp;
    });
  }
    

      toggle(movieID: string): void {
      this.isFavorite(movieID)
      ? this.removeMovieFromFavs(movieID)
      : this.addMovieToFavs(movieID);
  }

}
 */