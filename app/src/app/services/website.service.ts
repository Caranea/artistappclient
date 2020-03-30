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
  getTexts(userId) {
    return this.http.get(`${this.paths.apiUrl}/create_website/texts/${userId}`);
  }
  replaceText(userId, page, body) {
    return this.http.post(`${this.paths.apiUrl}/create_website/replace/${userId}/${page}`, body);
  }
  replaceLogo(userId,  body) {
    return this.http.post(`${this.paths.apiUrl}/create_website/replace_logo/${userId}`, body);
  }
  replaceIcon(userId,  body) {
    return this.http.post(`${this.paths.apiUrl}/create_website/replace_icon/${userId}`, body);
  }
  replaceArtworks(userId,  body) {
    return this.http.post(`${this.paths.apiUrl}/create_website/replace_artworks/${userId}`, body);
  }
  getPreview(userId) {
    return this.http.get(`${this.paths.apiUrl}/create_website/preview/${userId}`);
  }
  updateWebsite(userId, website) {
    return this.http.put(`${this.paths.apiUrl}/website/${userId}`, website);
  }
}
