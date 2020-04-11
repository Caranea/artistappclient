
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    currentUser;
    constructor(private _router: Router, private authenticationService: AuthenticationService,
    ) {
    }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any {
        if (localStorage.getItem('currentUser') === null) { this.authenticationService.logout(); return false } else { return true }
    }
}
