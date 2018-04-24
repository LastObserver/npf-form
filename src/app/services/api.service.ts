import { Injectable } from '@angular/core';
import { DataStep1 } from '../models/data-step-1';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataStep2 } from '../models/data-step-2';
import { DataStep3 } from '../models/data-step-3';

@Injectable()
export class ApiService {
  private apiUrl = '/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) {
  }
/**
 * Sends transformed data to api
 *
 * @returns {Observable}
 * @memberof ApiService
 */
  sendRequest(data) {
    return this.http.post(this.apiUrl, data, this.httpOptions);
  }
/**
 * Gets new captcha from api
 *
 * @param {any} url
 * @returns {Observable}
 * @memberof ApiService
 */
  requestCaptcha(url) {
    return this.http.get(url);
  }
/**
 * Requests to send SMS code to user's entered phone number
 *
 * @returns {Observable}
 * @memberof ApiService
 */
sendSmsCode(data, fullname: string) {
    const currentData = data;
    const body = {
      tel: currentData.personal.tel,
      fullname: fullname,
      passportseries: currentData.passport.passportseries,
      passportnumber: currentData.passport.passportnumber,
      birthdate: currentData.passport.birthdate,
    };
    return this.http.post(`${this.apiUrl}/sms`, body, this.httpOptions);
  }

}
