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
  ) {}

  /**
   * Sends NPO data to api
   *
   * @param {any} form data
   * @returns {Observable}
   * @memberof ApiService
   */
  sendNPORequest(data) {
    return this.http.post(this.apiUrl, data, this.httpOptions);
  }

  /**
   * Sends LK form data to api
   *
   * @param {any} form data
   * @returns {Observable}
   * @memberof ApiService
   */
  sendLKRequest(data) {
    return this.http.post(`${this.apiUrl}lk-form`, data, this.httpOptions);
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
