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
    getAllBy(time = 'allTime', sortBy = 'best', type = "all") {
        return this.http.get(`${this.paths.apiUrl}/artwork/all/${time}/${sortBy}/${type}`)
    }
    getAuthor(userId) {
        return this.http.get<Artwork[]>(`${this.paths.apiUrl}/artwork/autor/${userId}`);
    }
    getOne(artworkId) {
        return this.http.get<Artwork>(`${this.paths.apiUrl}/artwork/single/${artworkId}`);
    }
    add(artwork: Artwork) {
        return this.http.post(`${this.paths.apiUrl}/artwork/add`, artwork);
    }
    addReview(review, artworkId) {
        return this.http.post(`${this.paths.apiUrl}/artwork/${artworkId}/review`, review);
    }
    addComment(comment, artworkId) {
        return this.http.post(`${this.paths.apiUrl}/artwork/${artworkId}/comment`, comment);
    }
    update(artwork: Artwork, artworkId) {
        return this.http.put(`${this.paths.apiUrl}/artwork/${artworkId}`, artwork);
    }
    delete(id: number) {
        return this.http.delete(`${this.paths.apiUrl}/artwork/${id}`);
    }

}