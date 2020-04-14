import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Artwork } from '../models/artwork';
import { Paths } from "../config/paths"

@Injectable({ providedIn: 'root' })
export class AdminService {
    constructor(private http: HttpClient) {
     }
    private paths: any = Paths;
    getAll(time) {
        console.log(`${this.paths.apiUrl}/admin/artworks/${time}`)
        return this.http.get(`${this.paths.apiUrl}/admin/artworks/${time}`);
    }
}