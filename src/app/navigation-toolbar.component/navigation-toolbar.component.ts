import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { OnInit } from '@angular/core';
import { UserProfileComponent } from '../user-profile.component/user-profile.component';

@Component({
  selector: 'app-navigation-toolbar',
  standalone: false,
  templateUrl: './navigation-toolbar.component.html',
  styleUrl: './navigation-toolbar.component.scss',
})

export class NavigationToolbarComponent implements OnInit {

    constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


   logout(): void {
    // temporary stub
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out', 'OK', { duration: 2000 });
    console.log('Logging out');
  }

    openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '480px',
    });
  }
}
