import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void {
    }


  getUserDetails(): void {
    this.fetchApiData.getUserDetails().subscribe((resp: any) => {
     this.dialogRef.close(); // This will close the modal on success!
     console.log(resp);
      localStorage.setItem('user', resp.user.Username);
      localStorage.setItem('token', resp.token);
     this.snackBar.open('User Profile accessed successfully!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['profile']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });    });
  }

}
