import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ArtworkService } from '../services/artwork.service'
import { WebsiteService } from '../services/website.service'
import { Router } from '@angular/router';

import { faTimes, faCheck, faQuestionCircle, faInfoCircle, faLongArrowAltRight, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

declare var Stripe: any
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @ViewChild('categoriesInput') catInput;
  faPlusSquare = faPlusSquare;
  currentUser
  userProfile
  seoForm: FormGroup;
  faCheck = faCheck;
  faTimes = faTimes;
  faQuestionCircle = faQuestionCircle;
  faInfoCircle = faInfoCircle;
  faLongArrowAltRight = faLongArrowAltRight;
  artworks;
  rows;
  submitted
  loading = false;
  handler: any = null;
  categories = [];
  maxCategories;
  constructor(private router: Router, private websiteService: WebsiteService, private formBuilder: FormBuilder, private artworkService: ArtworkService, private authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
  }
  ngOnInit() {
    this.seoForm = this.formBuilder.group({
      siteTitle: ['', Validators.required],
      homepageTitle: ['', Validators.required],
      homepageDescription: ['', Validators.required],
      keywords: ['', Validators.required]
    });
    this.getAllArtworks()
    this.userService.getUserProfile(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.userProfile = data.userProfile;
          if (!this.userProfile.plan) { this.loadStripe(this.currentUser.email) };
          if (this.userProfile.plan) {
            this.maxCategories = this.userProfile.plan === 'basic' ? 3 : this.userProfile.plan === 'premium' ? 10 : 20;
            if (this.userProfile.plan !== 'pro') {
              this.loadStripeUpgrade(this.currentUser.email)
            }
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  onSubmit() {
    if (this.rows.filter(el => {
      return el.include === true
    }).length === 0) {
      this.alertService.error('Musisz zamieścic choć jedną pracę')
      return
    }

    if (this.categories.length === 0) {
      this.alertService.error('Dodaj choć jedną kategorie')
      return
    }
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.seoForm.invalid) {
      return;
    }
    this.loading = true;
    this.websiteService.addWebsite({ seo: this.seoForm.value, artworks: this.rows, userId: this.currentUser._id, categories: this.categories })
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Udało się zapisać informacje. Zostaniesz przekierowany do wyboru szablonu', true);
          this.router.navigate(['/szablon']);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  updateCategories(e) {
    if (this.catInput.nativeElement.value === '' || this.catInput.nativeElement.value === ' ') {
      return
    }
    this.categories.push(this.catInput.nativeElement.value.trim())
    this.catInput.nativeElement.value = ''
    if (this.categories.length > this.maxCategories - 1) {
      this.catInput.nativeElement.disabled = true;
    }
  }
  removeCategory(category) {
    this.categories = this.categories.filter(el => el !== category)
    if (this.categories.length < 3) {
      this.catInput.nativeElement.disabled = false;
    }
  }
  get f() { return this.seoForm.controls; }

  getAllArtworks() {
    this.artworkService.getAll(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.rows = []
          for (let artwork of data.artworks) {
            let artworkShort = {
              imageId: artwork._id,
              photoUrl: artwork.photosUrls[0],
              title: artwork.title,
              category: '',
              alt: '',
              include: true
            }
            this.rows.push(artworkShort)
          }
          this.rows = [...this.rows]
        },
        error => {
          this.alertService.error(error);
        });
  }

  updateValue(e, i) {
    let dataField = e.target.attributes.getNamedItem('data-field').value
    if (dataField !== 'include') {
      this.rows[i][dataField] = e.target.value
    } else {
      this.rows[i][dataField] = e.target.checked
    }
  }
  loadStripeUpgrade(email) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://js.stripe.com/v3";
    s.onload = () => {
      let stripes = Stripe('pk_live_Wn3nGfddYQmQHKrNzmGSQPDH00cEkEjiSp');
      var checkoutButton = document.getElementById('checkout-button-plan_H5KtfdBKssNv8y');
      checkoutButton.addEventListener('click', function () {
        stripes.redirectToCheckout({
          items: [{ plan: 'plan_H5KppzQqajZzoj', quantity: 1 }],
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
  loadStripe(email) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://js.stripe.com/v3";
    s.onload = () => {
      let stripes = Stripe('pk_live_Wn3nGfddYQmQHKrNzmGSQPDH00cEkEjiSp');
      var checkoutButton = document.getElementById('checkout-button-plan_GybwTOhupEPvny');
      checkoutButton.addEventListener('click', function () {
        stripes.redirectToCheckout({
          items: [{ plan: 'plan_H2mqINVY1YhquP', quantity: 1 }],
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
      var checkoutButton2 = document.getElementById('checkout-button-plan_GygExNVJ3cXyjU');
      checkoutButton2.addEventListener('click', function () {
        stripes.redirectToCheckout({
          items: [{ plan: 'plan_H2mqwJur7yNScJ', quantity: 1 }],
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
      var checkoutButton3 = document.getElementById('checkout-button-plan_GygFUxHrx9S8LB');
      checkoutButton3.addEventListener('click', function () {
        stripes.redirectToCheckout({
          items: [{ plan: 'plan_H2mtJNctVqip1b', quantity: 1 }],
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