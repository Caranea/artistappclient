import { Component, ViewChild, ElementRef, Renderer2, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from './services/auth.service';
import { User } from './models/user';
declare var Tawk_API: any;
declare var window: any
@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements DoCheck {
    @ViewChild('info') info;
    currentUser: User;
    isRegisterOrLoginPage
    faTimes = faTimes;
    title = "artistclient"
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private renderer: Renderer2
    ) {
        this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
    }
    ngDoCheck() {
        let url = window.location.href;
        url = url.toString()
        if (url.includes('rejestracja') || url.includes('login')) {
            this.isRegisterOrLoginPage = true;
            console.log(this.isRegisterOrLoginPage)
        }
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