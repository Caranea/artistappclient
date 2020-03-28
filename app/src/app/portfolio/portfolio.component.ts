import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ArtworkService } from '../services/artwork.service'
import { WebsiteService } from '../services/website.service'

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
  constructor(private websiteService: WebsiteService, private formBuilder: FormBuilder, private artworkService: ArtworkService, private authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService) {
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
          if (!this.userProfile.plan) this.loadStripe(this.currentUser.email);
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
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.seoForm.invalid) {
      return;
    }

    this.loading = true;
    this.websiteService.addWebsite({ seo: this.seoForm.value, artworks: this.rows, userId: this.currentUser._id })
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Udało się zapisać informacje. Zostaniesz przekierowany do poglądu strony', true);
          //   this.router.navigate(['/login']);
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
    if (this.categories.length > 2) {
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

  loadStripe(email) {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v3";
      s.onload = () => {
        let stripes = Stripe('pk_test_KIVSmDBlCt12Bn2tyirHxHNi00575cY6N2');
        var checkoutButton = document.getElementById('checkout-button-plan_GybwTOhupEPvny');
        checkoutButton.addEventListener('click', function () {
          stripes.redirectToCheckout({
            items: [{ plan: 'plan_GybwTOhupEPvny', quantity: 1 }],
            successUrl: window.location.protocol + '//knickknacks.pl/success',
            cancelUrl: window.location.protocol + '//knickknacks.pl/canceled',
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
            items: [{ plan: 'plan_GygExNVJ3cXyjU', quantity: 1 }],
            successUrl: window.location.protocol + '//knickknacks.pl/success',
            cancelUrl: window.location.protocol + '//knickknacks.pl/canceled',
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
            items: [{ plan: 'plan_GygFUxHrx9S8LB', quantity: 1 }],
            successUrl: window.location.protocol + '//knickknacks.pl/success',
            cancelUrl: window.location.protocol + '//knickknacks.pl/canceled',
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
}