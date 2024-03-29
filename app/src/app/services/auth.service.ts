import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from "../models/user";
import { Paths } from "../config/paths"
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    paths:any = Paths
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(`${this.paths.apiUrl}/users/login`, { email, password })
            .pipe(map(user => {
                user = user.user
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
        this.currentUserSubject.next(null);
    }

    reset(email) {
        return this.http.post<any>(`${this.paths.apiUrl}/users/reset-password`, { email})
    }
    validateToken(token) {
        return this.http.get<any>(`${this.paths.apiUrl}/users/reset/${token}`)
    }
    setPassword(token, password) {
        return this.http.post<any>(`${this.paths.apiUrl}/users/set-password/${token}`, {password})
    }
}