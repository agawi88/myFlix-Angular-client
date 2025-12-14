import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog'; 
import { OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-navigation-toolbar',
  standalone: false,
  templateUrl: './navigation-toolbar.component.html',
  styleUrl: './navigation-toolbar.component.scss',
})
export class NavigationToolbarComponent {

    constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }
   logout(): void {
    // temporary stub
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out', 'OK', { duration: 2000 });
    console.log('Logging out');

    
    isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}}
