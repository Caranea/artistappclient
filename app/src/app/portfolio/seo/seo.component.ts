import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

import { first } from 'rxjs/operators';
import { WebsiteService } from '../../services/website.service'
@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {
  
  currentUser;
  seo = {
      title: '',
      homepageTitle: '',
      homepageDescription: '',
      keywords: ''
    }
  constructor(private websiteService: WebsiteService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
  }

  ngOnInit(): void {
    this.websiteService.getWebsite(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.website && data.website.seo.length > 0){ 
            this.seo = data.website.seo[0]
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  updateValue(e, key) {
    this.seo[key] = e.target.value
  }
  
  createAndSaveForm() {
    this.websiteService.updateWebsite(this.currentUser._id, { seo: this.seo, userId: this.currentUser._id })
    .pipe(first())
    .subscribe(
      (data: any) => {
        this.alertService.success('Udało się zapisać dane')
      },
      error => {
        this.alertService.error(error);
      });
  }
}
