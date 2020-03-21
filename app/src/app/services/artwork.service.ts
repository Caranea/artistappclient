import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Artwork } from '../models/artwork';
import { Paths } from "../config/paths"

@Injectable({ providedIn: 'root' })
export class ArtworkService {
    constructor(private http: HttpClient) {
     }
    private paths: any = Paths;
    getAll(userId) {
        return this.http.get<Artwork[]>(`${this.paths.apiUrl}/artwork/${userId}`);
    }

    add(artwork: Artwork) {
        return this.http.post(`${this.paths.apiUrl}/artwork/add`, artwork);
    }

    // delete(id: number) {
    //     return this.http.delete(`${this.paths.apiUrl}/users/${id}`);
    // }
}