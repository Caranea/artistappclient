import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../services/artwork.service'
import { AuthenticationService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { faHourglassHalf, faLink } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';

import { first } from 'rxjs/operators';
declare var Stripe:any;
@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
  unpaidArtworksNumber = 0;
  currentUser;
  userProfile;
  artworks;
  faHourglassHalf = faHourglassHalf
  faLink = faLink
  checkout;
  constructor(private artworkService: ArtworkService, private authenticationService: AuthenticationService, private alertService: AlertService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
    this.userService.getUserProfile(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.userProfile = data.userProfile;
        },
        error => {
          this.alertService.error(error);
        });
  }

  ngOnInit(): void {
    this.getAllArtworks()
    this.loadStripe(this.currentUser.email)
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
            if (artwork.hasOwnProperty('paid') && artwork.paid === false) {
              console.log(artwork)
              this.unpaidArtworksNumber++
            }
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


  loadStripe(email) {
    console.log('s')
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://js.stripe.com/v3";
    console.log(s)
    s.onload = () => {
      console.log('s')
      let stripes = Stripe('pk_live_Wn3nGfddYQmQHKrNzmGSQPDH00cEkEjiSp');
      this.checkout = () => {
        stripes.redirectToCheckout({
          lineItems: [{ price: 'price_1HJyq1BihCZuV5pkTZgC40Sn', quantity: 1 }],
          mode: 'subscription',
          customerEmail: email,
          // Do not rely on the redirect to the successUrl for fulfilling
          // purchases, customers may not always reach the success_url after
          // a successful payment.
          // Instead use one of the strategies described in
          // https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: window.location.protocol + '//artysta.knickknacks.pl/portfolio/sukces',
          cancelUrl: window.location.protocol + '//artysta.knickknacks.pl/portfolio/blad',
        })
          .then(function (result) {
            if (result.error) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer.
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
      }
    }
    window.document.body.appendChild(s); 
  }
}
