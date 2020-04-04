import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service'
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true,
        });
        return next.handle(request).pipe(catchError(err => {
            let error = (err.error && err.error.error) ||  (err.error[0] && err.error[0].error) || err.error.message || err.statusText;
            if (err.status === 401) {
                error = "Nie jestes zalogowany"
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            }

            return throwError(error);
        }))
    }
}