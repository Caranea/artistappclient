import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { Artwork } from '../models/artwork';
import { Paths } from "../config/paths"

@Injectable({ providedIn: 'root' })
export class ArtworkService {
    private artworks$: Observable<Object>;
    private artworksAllTime$: Observable<Object>;

    constructor(private http: HttpClient) {
     }
    private paths: any = Paths;
    getAll(userId) {
        return this.http.get<Artwork[]>(`${this.paths.apiUrl}/artwork/${userId}`);
    }
    getAllBy(time = 'allTime', sortBy = 'best', type = "all", lastID?) {
        console.log(type)
        if (time === '30' && sortBy === 'best' && !lastID && type === "all") {
        console.log(type)

            if (!this.artworks$) {
                this.artworks$ = this.http.get(`${this.paths.apiUrl}/artwork/all/${time}/${sortBy}/${type}/${lastID}/`).pipe(
                  shareReplay(1)
                );
              }
              return this.artworks$;
        }
        if (time === 'allTime' && sortBy === 'best' && !lastID && type === "all") {
        console.log(type)

            if (!this.artworksAllTime$) {
                this.artworksAllTime$ = this.http.get(`${this.paths.apiUrl}/artwork/all/${time}/${sortBy}/${type}/${lastID}/`).pipe(
                  shareReplay(1)
                );
              }
              return this.artworksAllTime$;
        }
        return this.http.get(`${this.paths.apiUrl}/artwork/all/${time}/${sortBy}/${type}/${lastID}/`)
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