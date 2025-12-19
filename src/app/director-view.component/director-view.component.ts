import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-director-view',
  standalone: false,
  templateUrl: './director-view.component.html',
  styleUrl: './director-view.component.scss',
})
export class DirectorViewComponent {

    movie: any[] = [];
    director: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private MatDialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<DirectorViewComponent>,
  ) {}
  
 getDirector(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }
}
