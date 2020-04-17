import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Paths } from "../config/paths"

@Injectable({ providedIn: 'root' })
export class DomainService {
    constructor(private http: HttpClient) {
     }
    private paths: any = Paths;
    checkAvailability(domain) {
        return this.http.get(`https://domain-availability-api.whoisxmlapi.com/api/v1?apiKey=at_0trJN8hRWjgNw2gFo67EsNslvfcFF&domainName=${domain}`);
    }
    setDomain(userId, domain) {
        return this.http.post(`${this.paths.apiUrl}/create_website/set_domain/${userId}`, {domain});
    }
}