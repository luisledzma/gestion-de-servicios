import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError, concat, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class JarwisServiceService {


  private apiUrl = environment.apiURL + 'login';
  // private apiUrl = 'http://localhost:44398/api/login';


  // private baseUrl = 'http://127.0.0.1:8000/api/v1/expediente/usuario';

  constructor(private http: HttpClient) { }
  // signup(data) {
  //   return this.http.post(`${this.apiUrl}/signup`, data)
  // }

  login(data) {

    console.log(data);
    return this.http.post(`${this.apiUrl}/authenticate`, data);
    // .pipe(map((response: Response) => {
    //   const runs = response.json() as boolean;
    //   console.log(runs);
    //   return runs;
    // })).pipe(
    //   catchError(e => {
    //   if (e.status === 401) {
    //     console.log(e);
    //     return Observable.throw('Unauthorized');
    //   }
    //   // do any other checking for statuses here
    // }));
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.apiUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.apiUrl}/resetPassword`, data);
  }

  // updateUser(data) {
  //   return this.http.post(`${this.baseUrl}/updateUser`, data)
  // }

}
