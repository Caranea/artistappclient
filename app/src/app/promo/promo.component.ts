import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faQuestionCircle, faInfoCircle, faLongArrowAltRight, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  faQuestionCircle = faQuestionCircle;
  faInfoCircle = faInfoCircle;
  faLongArrowAltRight = faLongArrowAltRight;
  currentUser
  userProfile
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; })
  }

  ngOnInit(): void {
    this.userService.getUserProfile(this.currentUser._id)
    .pipe(first())
    .subscribe(
      (data: any) => {
        this.userProfile = data.userProfile;
        if (!this.userProfile.plan) { this.loadStripe(this.currentUser.email) };
      },
      error => {
        this.alertService.error(error);
      });
  }
  loadStripe(email) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://js.stripe.com/v3";
    s.onload = () => {
      let stripes = Stripe('pk_live_Wn3nGfddYQmQHKrNzmGSQPDH00cEkEjiSp');
      var checkoutButton = document.getElementById('checkout-button-plan_H7XGz5qzgJetd4');
      checkoutButton.addEventListener('click', function () {
        stripes.redirectToCheckout({
          items: [{ plan: 'plan_H7XGz5qzgJetd4', quantity: 1 }],
          successUrl: window.location.protocol + '//artysta.knickknacks.pl/portfolio/sukces',
          cancelUrl: window.location.protocol + '//artysta.knickknacks.pl/portfolio/blad',
          customerEmail: email
        })
          .then(function (result) {
            if (result.error) {
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
      });
    }
    window.document.body.appendChild(s); 
  }
}
