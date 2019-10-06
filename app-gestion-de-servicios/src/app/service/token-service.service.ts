import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  apiUrl = environment.apiURL;
  private iss = {
    login: 'http://localhost:44398'
    // signup:this.apiUrl+'signup'
  };

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      console.log(payload);
      if (payload) {
        console.log(this.iss);
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    console.log(payload);
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
