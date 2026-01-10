import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-director-view',
  standalone: false,
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorViewComponent {

    movie: any[] = [];
    director: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { director: any, movie: any},
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DirectorViewComponent>,
  ) {}
  
/*  getDirector(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  } */

    close(): void {
    this.dialogRef.close();
  }
}
