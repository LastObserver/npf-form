import { Injectable } from '@angular/core';
import { DataStep1 } from '../models/data-step-1';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataStep2 } from '../models/data-step-2';
import { DataStep3 } from '../models/data-step-3';
import { DataService } from './data.service';

@Injectable()
export class ApiService {
  private apiUrl = '/';

  constructor(
    private http: HttpClient,
    private dataService: DataService,
  ) {
  }

  sendRequest() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.apiUrl, this.dataService.transformedData, httpOptions);
  }

  requestCaptcha(url) {
    return this.http.get(url);
  }

}
