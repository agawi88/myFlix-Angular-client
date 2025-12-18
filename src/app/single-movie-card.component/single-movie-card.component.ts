import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view.component/director-view.component';

@Component({
  selector: 'app-single-movie-card.component',
  standalone: false,
  templateUrl: './single-movie-card.component.html',
  styleUrl: './single-movie-card.component.scss',
})
export class SingleMovieCardComponent implements OnInit {

  movie: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    //private router: Router
  ) {}

  ngOnInit(): void {
const title = this.route.snapshot.paramMap.get('Title');

  if (title) {
    this.getSingleMovie(title);
  }
}

  getSingleMovie(Title: string): void {
    this.fetchApiData.getSingleMovie(Title).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.movie;
    });
  }

  openDirectorDialog(directorName: any): void {
    if (!directorName) return;
    this.dialog.open(DirectorViewComponent, {
      data: directorName,
      width: '400px'
    });
  }

  openGenreDialog(genreName: any): void {
        if (!genreName) return;

    this.dialog.open(DirectorViewComponent, {
      data: genreName,
      width: '400px'
    });
  }

  addMovieToFavs(movieID: string): void {
    this.fetchApiData.addMovieToFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
/*       localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token); */
     this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
     });
    });
  }

  removeMovieFromFavs(movieID: string): void {
    this.fetchApiData.removeMovieFromFavs(movieID).subscribe((resp: any) => {
      console.log(resp);
      return resp;
    });
  }

}

