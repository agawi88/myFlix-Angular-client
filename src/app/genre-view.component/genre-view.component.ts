import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent {

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenreViewComponent>,
  ) {}

  getGenre(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }
}
