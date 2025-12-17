import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  standalone: false,
  templateUrl: './director-view.component.html',
  styleUrl: './director-view.component.scss',
})
export class DirectorViewComponent {

    movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DirectorViewComponent>,
  ) {}
  
 getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }
}
