import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service'
import { ArtworkService } from '../services/artwork.service'
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from '../models/artwork';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  submitted;
  loading;
  currentUser;
  usersArtworks;
  meanReview: any;
  allReviews = 0;
  id;
  fieldsToShow: any = [{
    name: 'city',
    pl: 'Miasto'
  }, {
    name: 'gender',
    pl: 'Płeć'
  },
  {
    name: 'favouriteArtists',
    pl: 'Ulubieni artyści'
  }, {
    name: 'inspirations',
    pl: 'Inpiracje'
  }, {
    name: 'techniques',
    pl: 'Technika'
  }
  ]
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private artworkService: ArtworkService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getUserProfile(this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.profile = data.userProfile;
          this.loading = false;
        }, error => {
          this.alertService.error(error);
          this.loading = false;
        });

    this.artworkService.getAll(this.id)
      .subscribe(
        (data: any) => {
          this.usersArtworks = data.artworks;
          let temp = 0;
          this.usersArtworks.forEach(artwork => artwork.reviews.forEach(review => {
            temp += review.review;
            this.allReviews++;
          }))
          this.meanReview = isNaN((temp / this.allReviews)) ? 0 : (temp / this.allReviews).toFixed(2);
          let formatter = new Intl.DateTimeFormat('pl', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          this.usersArtworks.map(artwork => artwork.date = formatter.format(new Date(artwork.date)))
          this.loading = false;
        }, error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  ngOnInit(): void {
  }
}
