import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent  implements OnInit {

  movie: any[] = [];
  genre: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genreName: string },
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenreViewComponent>,
    //private Matdialog: MatDialog,
    private router: Router 
  ) {}
  ngOnInit(): void {
   // const genreName = this.dialogRef.componentInstance.movie.genreName;
    //this.getGenre(genreName);
  }

  getGenre(genreName: string): any {
    this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
      console.log(resp);
      this.genre = resp;
      return resp;
    });
  }
}
