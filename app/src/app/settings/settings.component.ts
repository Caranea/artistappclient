import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  activeTab = 'acc'
  profile;
  currentUser;
  data = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; })
    
  }

  cancel() {
    this.userService.cancelSubscription(this.profile.subscription)
    .pipe(first())
      .subscribe(
        (data: any) => {
          delete this.profile.plan
          delete this.profile.subscription
          this.alertService.success('Subskrypcja anulowana.');
        }, error => {
          this.alertService.error(error);
        });
  }
  cancelArtworkSub() {
    this.userService.cancelSubscription(this.profile.artworkSubId)
    .pipe(first())
      .subscribe(
        (data: any) => {
          delete this.profile.hasPaid
          delete this.profile.artworkSubId
          this.alertService.success('Subskrypcja anulowana.');
        }, error => {
          this.alertService.error(error);
        });
  }
  ngOnInit(): void {
    this.userService.getUserProfile(this.currentUser._id, true)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.profile = data.userProfile;
          console.log(this.profile)
        }, error => {
          this.alertService.error(error);
        });
  }

}
