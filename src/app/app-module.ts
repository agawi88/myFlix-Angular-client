import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card.component/movie-card.component';
import { WelcomePageComponent } from './welcome-page.component/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user-profile.component/user-profile.component';
import { FavoriteMoviesComponent } from './favorite-movies.component/favorite-movies.component';
import { DirectorViewComponent } from './director-view.component/director-view.component';
import { GenreViewComponent } from './genre-view.component/genre-view.component';
import { NavigationToolbarComponent } from './navigation-toolbar.component/navigation-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SingleMovieCardComponent } from './single-movie-card.component/single-movie-card.component';


///
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
    FavoriteMoviesComponent,
    DirectorViewComponent,
    GenreViewComponent,
    NavigationToolbarComponent,
    SingleMovieCardComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
