import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form-dialog.component',
  standalone: false,
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
})
export class UserFormDialogComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };
  
    constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) {}
  ngOnInit(): void {

}
  // This is the function responsible for sending the form inputs to the backend
  editUser(): void {
      this.fetchApiData.editUserDetails(this.userData).subscribe((response) => {
    // Logic for a successful user edit goes here! 
       this.dialog.closeAll(); // This will close the modal on success!
       console.log(response);
        localStorage.setItem('user', response.Username);
       this.snackBar.open('user edited successfully!', 'OK', {
          duration: 2000
       });
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }

}
