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
  constructor(private artworkService: ArtworkService, private alertService: AlertService, private userService: UserService) { }
  ngOnInit(): void {
    this.getArtworks('today', 'best');
    this.getArtists('best')
    this.getSection('malarstwo')
  }
  getArtworks(time, sortBy) {
    this.active = time+sortBy;
    this.artworkService.getAllBy(time, sortBy)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.artworks = data.artworks
        },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }
  showAllFn(){
    this.showAll = !this.showAll
    if(this.active === 'monthbest' || this.active === 'todaybest')  {
      this.getArtworks('allTime', 'best')
    }
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
    this.artworkService.getAllBy('allTime', 'best', section)
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
