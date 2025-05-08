import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getIncomeExpenseData():Observable<any>{
    return this.http.get<any>(this.baseUrl + '/transactions',{withCredentials: true})
  }

}
