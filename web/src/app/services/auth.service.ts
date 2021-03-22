import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  login() {
    return this.http.post(this.baseUrl + environment.endPoints.auth,{})
  }

  validateToken() {
    const url = environment.baseUrl + environment.endPoints.auth;
    return this.http.get( url, this.headers)
  }
}

