/**
 *
 * Provides centralized communication with the myFlix REST API.
 * This service handles authentication, user management,
 * movie data retrieval, and favorite movie operations.
 *
 */


import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


import { environment } from '../environments/environment';
const apiUrl = environment.apiUrl;

/**
 * Service responsible for all communication with the myFlix API.
 *
 * It provides methods for:
 * - registering and logging users in and out
 * - retrieving user data
 * - updating and deleting user accounts
 * - fetching movies, directors, and genres
 * - managing favorite movies
 */

@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  /**
   * Creates an instance of FetchApiDataService.
   *
   * @param http Angular HttpClient for API requests
   */

  constructor(private http: HttpClient) {}


    /* ========= AUTH & USER ========= */

  /**
   * Registers a new user.
   *
   * @param userDetails User registration data
   * @returns Observable containing the server response
   */
  
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Logs a user in.
   *
   * @param userDetails Login credentials
   * @returns Observable containing authentication data
   */
  
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

    /* ===== MOVIES API CALLS ====== */
  /**
   * Retrieves all movies.
   *
   * @returns Observable containing an array of movies
   */
  
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single movie by title.
   *
   * @param title Movie title
   * @returns Observable containing movie details
   */
  
  public getSingleMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Retrieves director details.
   *
   * @param directorName Director name
   * @returns Observable containing director data
   */
  
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/Director/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves genre details.
   *
   * @param genreName Genre name
   * @returns Observable containing genre data
   */
  
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/Genre/${genreName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /* ===== USER API CALLS ===== */

  /**
   * Retrieves details of the currently logged-in user.
   *
   * @returns Observable containing user data
   */
  
  public getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Updates the currently logged-in user's details.
   *
   * @param updatedUserDetails Updated user data
   * @returns Observable containing the updated user object
   */
  
  public editUserDetails(updatedUserDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${Username}`, updatedUserDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes the currently logged-in user's account.
   *
   * @returns Observable indicating completion
   */
  
  public deleteUserAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the user's favorite movies.
   *
   * @returns Observable containing favorite movies
   */
  
  public getUserFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${Username}/FavoriteMovies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }  

  /**
   * Adds a movie to the user's favorites.
   *
   * @param movieId Movie ID
   * @returns Observable containing updated user data
   */
  
  public addMovieToFavs(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.post(
      apiUrl + `users/${Username}/movies/${MovieID}`, 
      null, 
      {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

 /**
   * Removes a movie from the user's favorites.
   *
   * @param movieId Movie ID
   * @returns Observable containing updated user data
   */
  
 public removeMovieFromFavs(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(
      apiUrl + `users/${Username}/movies/${MovieID}`, 
      null, 
      {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts the response body from HTTP responses.
   */
  
  private extractResponseData(res: any): any { 
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP errors returned by the API.
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
