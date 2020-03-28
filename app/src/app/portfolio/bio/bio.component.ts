import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { AuthenticationService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { WebsiteService } from '../../services/website.service'

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  currentUser;
  profile = {}
  faQuestionCircle = faQuestionCircle;
  user;
  website = false
  websiteBio;
  constructor(private userService: UserService, private websiteService: WebsiteService, private authenticationService: AuthenticationService, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x });
  }

  ngOnInit(): void {
    this.websiteService.getWebsite(this.currentUser._id)
    .pipe(first())
    .subscribe(
      (data: any) => {
        if (data.website) {
          this.website = true;
          if (data.website.bio) {
            this.websiteBio = true;
            this.profile = data.website.bio
          } else {
            this.getProfile();
          }
        } else {
          this.getProfile()
        }
      },
      error => {
        this.alertService.error(error);
      });
  }

  updateValue(e, key1, key2) {
    this.profile[key1][key2] = e.target.value;
  }


  getProfile() {
    console.log('getting profile')
    this.userService.getUserProfile(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          let keys = Object.keys(data.userProfile)
          keys.forEach(key => {
            this.profile[key] = {}
            this.profile[key] = {
              value: data.userProfile[key],
              include: true
            }
          })
        },
        error => {
          this.alertService.error(error);
        });
  }

  createAndSaveForm() {
    let updatedData = { bio: this.profile, userId: this.currentUser._id };
    if (!this.website) {
      this.websiteService.addWebsite(updatedData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.website = data.userProfile;
            this.alertService.success('Udało się zapisać dane')
          },
          error => {
            this.alertService.error(error);
          });
    } else {
      this.websiteService.updateWebsite(this.currentUser._id, updatedData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.website = true;
            this.alertService.success('Udało się zapisać dane')
          },
          error => {
            this.alertService.error(error);
          });
    }
  }
}
