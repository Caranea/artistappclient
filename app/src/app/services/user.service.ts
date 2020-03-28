﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Paths } from "../config/paths"

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    private paths:any  = Paths;

    getAll() {
        return this.http.get<User[]>(`${this.paths.apiUrl}/users`);
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

    getUserProfile(id, extended = false) {
        return this.http.get(`${this.paths.apiUrl}/users/profile/${id}/${extended}`);
    }

    delete(id: number) {
        return this.http.delete(`${this.paths.apiUrl}/users/${id}`);
    }
}