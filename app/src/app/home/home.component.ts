import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../services/artwork.service'
import { AlertService } from '../services/alert.service'
import { UserService } from '../services/user.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  artworks;
  active;
  showAll;
  users;
  activeArtist = 'best'
  activeSection = 'malarstwo'
  sectionArtworks;
  time;
  sortBy;
  loadingPics = false;
  constructor(private artworkService: ArtworkService, private alertService: AlertService, private userService: UserService) { }
  ngOnInit(): void {
    this.getArtworks('30', 'best');
    this.getArtists('best')
    this.getSection('malarstwo')
  }
  getArtworks(time, sortBy) {
    this.loadingPics = true;
    this.time = time;
    this.sortBy = sortBy;
    let changedCategory = ((time + sortBy !== this.active) && (this.artworks !== undefined))
    this.active = time + sortBy;
    let lastId = !this.artworks || changedCategory ? null : this.artworks.length
    if (lastId !== null && sortBy === 'new') lastId = this.artworks.length
    this.artworkService.getAllBy(time, sortBy, 'all', lastId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (!this.artworks || changedCategory) {
            this.artworks = data.artworks
          } else {
            this.artworks = this.artworks.concat(data.artworks)
          }
          this.loadingPics = false;
        },
        error => {
          this.alertService.error(error);
        });
  }
  showAllFn() {
    this.getArtworks(this.time, this.sortBy)
  }
  showAllTypeFn() {
    let lastId = this.sectionArtworks.length
    this.artworkService.getAllBy('allTime', 'best', this.activeSection, lastId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.sectionArtworks = this.sectionArtworks.concat(data.artworks)
        },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }
  showAllArtistsFn(type) {
    this.userService.getShortUsers('all')
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.users = this.users.concat(data.usersShort)
          console.log(this.users, data.usersShort)
        },
        error => {
          this.alertService.error(error);
        });
  }
  getArtists(type) {
    this.activeArtist = type
    this.userService.getShortUsers('best')
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.users = data.usersShort
        },
        error => {
          this.alertService.error(error);
        });
  }
  getSection(section) {
    this.activeSection = section
    this.artworkService.getAllBy('allTime', 'best', section, null)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.sectionArtworks = data.artworks
        },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }
}
