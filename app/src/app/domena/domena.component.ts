import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { DomainService } from '../services/domain.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-domena',
  templateUrl: './domena.component.html',
  styleUrls: ['./domena.component.scss']
})
export class DomenaComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;
  domainForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  buttonText = "Sprawdź dostępność"
  domain = ''
  loadingDomain
  currentUser
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private domainService: DomainService,
    private authService: AuthenticationService,
    private userService: UserService,
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(this.currentUser._id)
        .pipe(first())
        .subscribe((data: any) => {
          if(data.userProfile.domain) {
            this.domain = data.userProfile.domain
            this.domainForm.get('domain').setValue(this.domain)
          }
        }, error => {
          this.alertService.error(error);
        })
    });
  }

  ngOnInit(): void {
    this.domainForm = this.formBuilder.group({
      domain: [this.domain, [Validators.required, Validators.pattern(/^(?!.* .*)(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/)]],
    });
  }
  get f() { return this.domainForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.f.domain.value.trim()
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.domainForm.invalid) {
      return;
    }
    this.loading = true;
    this.domainService.checkAvailability(this.f.domain.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log(data)
          if (data.domainAvailability === "AVAILABLE" || data.DomainInfo.domainAvailability === "AVAILABLE") {
            this.alertService.success("Wybrana przez Ciebie domena jest dostępna");
            this.domain = this.f.domain.value
          } else {
            this.alertService.error("Domena jest już zajęta. Wybierz inną");
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  setDomain() {
    if (!this.domain) {
      return;
    }
    this.loadingDomain = true;
    this.domainService.setDomain(this.currentUser._id, this.f.domain.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success("Udało się zapisać domenę. Prosimy o sprawdzanie poczty e-mail, będziemy tam wysyłać informacje dotyczące postępów w przypisaniu domeny.");

          this.loadingDomain = false;
        },
        error => {
          this.alertService.error(error);
          this.loadingDomain = false;
        });
  }
}
