import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoritesServices } from '../favorite-movies.service/favorites';

@Component({
  selector: 'app-movie-card.component',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})

export class MovieCardComponent implements OnInit{

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public favorites: FavoritesServices,
  ) {}
  
  ngOnInit(): void {
    this.getAllMovies();
    this.favorites.loadFavorites();  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // open dialog for the clicked movie — pass the actual movie object as dialog data
  openSingleMovieCardComponent(Title: any): void {
    this.router.navigate(['/movies', Title]);
  }

  isFavorite(movieID: string): boolean {
  return this.favorites.isFavorite(movieID);
}

  toggle(movieID: string): void {
  this.favorites.toggle(movieID);
}


}
