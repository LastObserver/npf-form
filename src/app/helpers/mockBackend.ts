import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class MockBackend implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return Observable.of(null).mergeMap(() => {

      if (request.url.endsWith('/') && request.method === 'POST') {
        const body = {};

        return Observable.of(new HttpResponse({ status: 200, body: body }));
      }

      if (request.url.endsWith('/sms') && request.method === 'POST') {
        const body = {};

        return Observable.of(new HttpResponse({ status: 200, body: body }));
      }

      if (request.url.endsWith('/captcha/') && request.method === 'GET') {

        const body = {
          value: '0031173fe8d797b1ea7a291bbca4e93f',
          src: './assets/images/captcha.jpg',
        };

        return Observable.of(new HttpResponse({ status: 200, body: body }));
      }

      return next.handle(request);

    })

      .materialize()
      .delay(500)
      .dematerialize();
  }
}
// exporting http interceptor provider
export const MockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackend,
  multi: true
};
