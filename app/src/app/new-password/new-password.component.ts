import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { AlertService, } from '../services/alert.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  id
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('token')
    this.authenticationService.validateToken(this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.router.navigate(['/reset']);

        });
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  onSubmit() {
    console.log('np')
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.setPassword(this.id, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.alertService.success(data.message)
        },
        error => {
          this.alertService.error(error);
          this.router.navigate(['/reset']);
        });
  }
}
