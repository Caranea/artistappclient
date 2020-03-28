import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/auth.service';
import { User } from './models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    title="artistclient"
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}