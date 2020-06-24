import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faTimes, faCheck, faQuestionCircle, faInfoCircle, faLongArrowAltRight, faPlusSquare, faIcons, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
declare var Stripe: any
declare var fbq: any;
import { AuthenticationService } from '../services/auth.service';
import { AlertService, } from '../services/alert.service';
import { UserService, } from '../services/user.service';
@Component({
  selector: 'app-general-portfolio',
  templateUrl: './general-portfolio.component.html',
  styleUrls: ['./general-portfolio.component.scss']
})
export class GeneralPortfolioComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faCheck = faCheck;
  faTimes = faTimes;
  faIcons = faIcons;
  faAngleDoubleRight = faAngleDoubleRight;
  faQuestionCircle = faQuestionCircle;
  faInfoCircle = faInfoCircle;
  faLongArrowAltRight = faLongArrowAltRight;
  modalRef: BsModalRef;
  plan;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,

    private alertService: AlertService,
    private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, plan: string) {
    this.modalRef = this.modalService.show(template);
    this.plan = plan
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      termsAgreement: ['', Validators.required],
    });
    console.log(fbq)
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    let email = this.f.email.value
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          fbq('track', 'StartTrial');
          var s = window.document.createElement("script");
          s.id = "stripe-script";
          s.type = "text/javascript";
          s.src = "https://js.stripe.com/v3";
          s.onload = () => {
            let stripes = Stripe('pk_live_Wn3nGfddYQmQHKrNzmGSQPDH00cEkEjiSp');
            stripes.redirectToCheckout({
              items: [{ plan: this.plan, quantity: 1 }],
              successUrl: window.location.protocol + '//artysta.knickknacks.pl/login',
              cancelUrl: window.location.protocol + '//artysta.knickknacks.pl/portfolio/blad',
              customerEmail: email
            })
              .then(function (result) {
                if (result.error) {
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              });
          }
          window.document.body.appendChild(s);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}