import { NgModule } from '@angular/core';

/* NgModule declarations */
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card.component/movie-card.component';
import { WelcomePageComponent } from './welcome-page.component/welcome-page.component';
import { UserProfileComponent } from './user-profile.component/user-profile.component';
import { FavoritesServices } from './favorite-movies.service/favorites';
import { DirectorViewComponent } from './director-view.component/director-view.component';
import { GenreViewComponent } from './genre-view.component/genre-view.component';
import { NavigationToolbarComponent } from './navigation-toolbar.component/navigation-toolbar.component';
import { SingleMovieCardComponent } from './single-movie-card.component/single-movie-card.component';
import { UserFormDialogComponent } from './user-form-dialog.component/user-form-dialog.component';

/* NgModule imports */
import { CommonModule, NgIf } from '@angular/common';
import { BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


/* Paths used for routing between views */
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'movies/:Title', component: SingleMovieCardComponent },
  { path: 'users/:Username', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

///
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    DirectorViewComponent,
    GenreViewComponent,
    NavigationToolbarComponent,
    SingleMovieCardComponent,
    UserFormDialogComponent,
  ],
  imports: [
    CommonModule,
    NgIf,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FavoritesServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
