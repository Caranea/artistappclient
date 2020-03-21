import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../services/artwork.service'
import { AuthenticationService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
  currentUser;
  artworks = [];
  faHourglassHalf = faHourglassHalf
  constructor(private artworkService: ArtworkService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
  }

  ngOnInit(): void {
    this.artworkService.getAll(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          for (let artwork of data.artworks) {
            this.artworks.push(artwork)
          }
          console.log("artworks", this.artworks)
        },
        error => {
          this.alertService.error(error);
        });
  }

}
