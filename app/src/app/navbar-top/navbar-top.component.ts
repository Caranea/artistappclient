import { Component, OnInit } from '@angular/core';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';
@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent {
  faBell = faBell;
  faUser = faUser;
  currentUser: User;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; })
  }

}
