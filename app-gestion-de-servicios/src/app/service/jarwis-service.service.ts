import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JarwisServiceService {

  
  private apiUrl = environment.apiURL+'login';
  //private apiUrl = 'http://localhost:44398/api/login';
  

  //private baseUrl = 'http://127.0.0.1:8000/api/v1/expediente/usuario';

  constructor(private http: HttpClient) { }
  // signup(data) {
  //   return this.http.post(`${this.apiUrl}/signup`, data)
  // }

  login(data) {
    return this.http.post(`${this.apiUrl}/authenticate`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.apiUrl}/sendPasswordResetLink`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.apiUrl}/resetPassword`, data)
  }

  // updateUser(data) {
  //   return this.http.post(`${this.baseUrl}/updateUser`, data)
  // }

}
