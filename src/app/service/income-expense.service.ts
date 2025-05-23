import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Transaction} from '../interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getIncomeExpenseData():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/transactions`, {withCredentials: true})
  }

  createNewTransaction(transaction: any){
    return this.http.post(`${this.baseUrl}/transactions`, transaction, {responseType:"text", withCredentials: true})
  }

  updateTransactionData(transaction: any){
    return this.http.patch<Transaction>(`${this.baseUrl}/transactions/${transaction.id}`, transaction, {responseType:"json", withCredentials: true})
  }

  removeTransactionData(id: number){
    return this.http.delete(`${this.baseUrl}/transactions/${id}`, {withCredentials: true})
  }
}
