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

    register(user: User) {
        return this.http.post(`${this.paths.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.paths.apiUrl}/users/${id}`);
    }
}