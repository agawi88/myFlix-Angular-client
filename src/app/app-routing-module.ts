import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page.component/welcome-page.component';
import { MovieCardComponent } from './movie-card.component/movie-card.component'; 
import { UserProfileComponent } from './user-profile.component/user-profile.component';
import { SingleMovieCardComponent } from './single-movie-card.component/single-movie-card.component';




///
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'movies/:id', component: SingleMovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
