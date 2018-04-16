import { Injectable } from '@angular/core';
import { DataStep1 } from '../models/data-step-1';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  step1Data: DataStep1
  private apiUrl = '/'

  constructor(private http: HttpClient) {
  }

  sendRequest(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(this.apiUrl, data, httpOptions)
  }

  requestCaptcha(url) {
    return this.http.get(url)
  }

}
