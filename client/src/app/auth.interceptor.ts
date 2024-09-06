import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    if (!req.url.includes('/api/users/login')) {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    }
    return next.handle(authReq);
  }
}
