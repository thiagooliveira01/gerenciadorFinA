// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/user';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  // API path
  basePath = 'http://localhost:63594/';
 
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
 
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocorreu um erro. Verifique:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Status Erro ${error.status}, ` +
        `Mensagem de erro: ${error.error.ModelState}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Algo ruím aconteceu. Tente novamente mais tarde.');
  }
 
  // Verify user credentials on server to get token
  loginForm(data): Observable<LoginResponse> {
    const login = "grant_type=password&username="+data.username+"&password="+data.password;

    return this.http
      .post<LoginResponse>(this.basePath + 'Token', login, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  cadastrarForm(data): Observable<any> {
    const httpOp = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post<any>(this.basePath + 'api/Account/Register', data, httpOp)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
 
  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('name', resp.userName);
    localStorage.setItem('access_token', resp.access_token);
    this.router.navigate(['/consulta']);
  }
 
  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
 
  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
 
}