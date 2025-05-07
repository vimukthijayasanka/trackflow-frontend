import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  login(user: any){
    return this.http.post(`${this.baseUrl}/auth/login`, user, {withCredentials: true, responseType: 'json'});
  }

  signup(user: any){
    return this.http.post(`${this.baseUrl}/user`, user, {responseType: 'text'});
  }
}
