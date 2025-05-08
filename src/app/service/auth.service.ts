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

  logout(){
    return this.http.delete(`${this.baseUrl}/auth/logout`, {withCredentials:true});
  }

  getUserDetails(){
    return this.http.get<any>(`${this.baseUrl}/user/me`, {withCredentials: true});
  }

  updateUserDetails(user: any){
    return this.http.put(`${this.baseUrl}/user/me`, user, {responseType: "text" ,withCredentials: true});
  }

  updateUserProfileImage(formData: FormData){
    return this.http.post(`${this.baseUrl}/user/me/upload`, formData, {responseType: "text", withCredentials: true});
  }
}
