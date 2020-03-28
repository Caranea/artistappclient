import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Paths } from "../config/paths";

@Injectable({ providedIn: "root" })
export class WebsiteService {
  constructor(private http: HttpClient) { }
  private paths: any = Paths;

  addWebsite(website) {
    return this.http.post(`${this.paths.apiUrl}/website/add`, website);
  }
  getWebsite(userId) {
    return this.http.get(`${this.paths.apiUrl}/website/${userId}`);
  }
  updateWebsite(userId, website) {
    return this.http.put(`${this.paths.apiUrl}/website/${userId}`, website);
  }
}
