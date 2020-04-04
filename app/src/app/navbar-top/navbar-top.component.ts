import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

import { User } from '../models/user';
@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavbarTopComponent {
  faBell = faBell;
  faUser = faUser;
  currentUser;
  profile
  unred = false;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; }); 
    this.getUser()
    router.events.subscribe((val) => {
      this.getUser()
    })
  }

  getUser() {
    this.userService.getUserProfile(this.currentUser._id, true)
    .subscribe(
      (data: any) => {
        this.profile = data.userProfile;
        this.unred = this.profile.notifications.filter(el => {
          return el.displayed === false
        }).length === 0 ? false : true
      }, error => {
        this.alertService.error(error);
      });
  }

  logout() {
    this.userService.logout()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate(['login']);
        }, error => {
          this.alertService.error(error);
        });
  }

  readNotifications() {
    this.userService.readNotifications(this.currentUser._id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.unred = false;
        }, error => {
          this.alertService.error(error);
        });
  }
}
