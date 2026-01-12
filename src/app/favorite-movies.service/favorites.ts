import { Injectable, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SingleMovieCardComponent } from '../single-movie-card.component/single-movie-card.component';
//import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class FavoritesServices {

  favoriteMovies: any[] = [];

  constructor(
     //   @Inject(MAT_DIALOG_DATA) public data: { Title: any, movie: any},
        private fetchApiData: FetchApiDataService,
/*         private dialog: SingleMovieCardComponent,
        private dialogRef: MatDialogRef<SingleMovieCardComponent>, */
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

/*     openMovieDialog(movie: any, Title: any): void {
      this.dialog.open(SingleMovieCardComponent, {
        data: { movie: movie, Title: Title },
        width: '400px'
      });
    }

        close(): void {
    this.dialogRef.close(); 
  }
*/

}