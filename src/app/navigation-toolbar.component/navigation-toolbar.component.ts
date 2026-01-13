import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { OnInit } from '@angular/core';

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

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isWelcomePage(): boolean {
    return this.router.url === '/welcome' || this.router.url === '/';
  }

  openUserProfile(): void {
    this.router.navigate(['/users', localStorage.getItem('user')]);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out', 'OK', { duration: 2000 });
    console.log('Logging out');
  }

}

