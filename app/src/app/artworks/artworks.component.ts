import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../services/artwork.service'
import { AuthenticationService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { faHourglassHalf, faLink } from '@fortawesome/free-solid-svg-icons';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
  currentUser;
  artworks;
  faHourglassHalf = faHourglassHalf
  faLink = faLink
   constructor(private artworkService: ArtworkService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
  }

  ngOnInit(): void {
    this.getAllArtworks()
  }

  delete(artworkId) {
    this.artworkService.delete(artworkId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success(data);
          this.artworks = [];
          this.getAllArtworks()
        },
        error => {
          this.alertService.error(error);
        });
  }

  getAllArtworks() {
    this.artworkService.getAll(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.artworks = [];
          for (let artwork of data.artworks) {
            this.artworks.push(artwork)
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  meanReview(reviews) {
    return (reviews.reduce((total, next) => total + next.review, 0) / reviews.length).toFixed(2)
  }

}
