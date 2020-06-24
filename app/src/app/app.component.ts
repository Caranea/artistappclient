import { Component, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from './services/auth.service';
import { User } from './models/user';
declare var Tawk_API: any;

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    @ViewChild('info') info;
    currentUser: User;
    faTimes = faTimes;
    title = "artistclient"
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private renderer: Renderer2
    ) {
        this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
    }
    hide() {
        const active = this.info.nativeElement.classList.contains('active');

        this.renderer[active ? 'removeClass' : 'addClass'](this.info.nativeElement, 'd-none');
        console.log(this.info)
    }
    showChat() {
        Tawk_API.maximize();
        this.hide()
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}