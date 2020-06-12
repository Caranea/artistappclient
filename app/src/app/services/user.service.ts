﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Paths } from "../config/paths"

import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    private paths: any = Paths;
    private user$: Observable<Object>
    getAll() {
        return this.http.get<User[]>(`${this.paths.apiUrl}/users`);
    }

    logout() {
        return this.http.get(`${this.paths.apiUrl}/users/logout`);
    }

    getShortUsers(type) {
        return this.http.get(`${this.paths.apiUrl}/users/short/${type}`);
    }

    register(user: User) {
        return this.http.post(`${this.paths.apiUrl}/users/register`, user);
    }

    update(user, id) {
        return this.http.put(`${this.paths.apiUrl}/users/profile/${id}`, user);
    }
    follow(body) {
        return this.http.post(`${this.paths.apiUrl}/users/profile/observe`, body);
    }
    readNotifications(id) {
        return this.http.get(`${this.paths.apiUrl}/users/read_notifications/${id}`);
    }
    getUserProfile(id, extended = false) {
        if (extended) {
            if (!this.user$) {
                this.user$ = this.http.get(`${this.paths.apiUrl}/users/profile/${id}/${extended}`).pipe(
                    shareReplay(1)
                );
            }
            return this.user$;
        }
        return this.http.get(`${this.paths.apiUrl}/users/profile/${id}/${extended}`)
    }

    cancelSubscription(id) {
        return this.http.get(`${this.paths.apiUrl}/users/subscription/cancel/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`${this.paths.apiUrl}/users/${id}`);
    }
}