import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card.component/movie-card.component';
import { SingleMovieCardComponent } from '../single-movie-card.component/single-movie-card.component';


@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent {

  movie: any = {};
  genre: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: any, movie: any},
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenreViewComponent>,
    private router: Router 
  ) {}


/* getGenre(genreName: string): void {
  this.fetchApiData.getGenre(genreName).subscribe({
    next: (resp: any) => {
      console.log('Genre response:', resp);
      this.genre = resp;
    },
    error: (err: any) => {
      console.error(err);
      this.snackBar.open('Failed to load genre', 'OK', {
        duration: 3000,
      });
    }
  });
} */
  close(): void {
    this.dialogRef.close();
  }
}