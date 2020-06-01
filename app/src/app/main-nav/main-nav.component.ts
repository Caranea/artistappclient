import { Component, AfterContentChecked } from '@angular/core';
import { faPalette, faIcons, faLaptopCode, faHatWizard, faSlidersH, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements AfterContentChecked {
  faPalette = faPalette;
  faIcons = faIcons;
  faLaptopCode = faLaptopCode;
  faHatWizard = faHatWizard;
  faSlidersH = faSlidersH;
  faQuestionCircle = faQuestionCircle;
  currentUser;
  bottomMenu;
  activeNavTop;
  activeNavBottom;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
    this.bottomMenu = {
      'faq': [{ name: 'Najczęstsze pytania', path: '/faq' }],
      'ustawienia': [{ name: 'Główne', path: '/ustawienia' }],
      'portal': [{ name: 'Portal', path: 'portal' }],
      'portfolio': [{ name: 'Panel', path: 'portfolio' }],
      'podglad': [{ name: 'Panel', path: 'portfolio' }, { name: 'Wybierz motyw', path: 'szablon' }, { name: 'Edycja strony', path: 'podglad' }],
      'szablon': [{ name: 'Panel', path: 'portfolio' }, { name: 'Wybierz motyw', path: 'szablon' }, { name: 'Edycja strony', path: 'podglad' }],
      'prace': [{ name: 'Przeglądaj', path: 'prace' }, { name: 'Dodaj nową', path: 'prace/dodaj' }],
      'profil': [{ name: 'Podgląd', path: `profil/zobacz/${this.currentUser._id}` }, { name: 'Edytuj profil', path: 'profil/edytuj' }]
    }

    if (this.currentUser.plan === 'pro') {
      this.bottomMenu['podglad'].push({ name: 'Domena', path: 'domena' })
      this.bottomMenu['szablon'].push({ name: 'Domena', path: 'domena' })
    }
  }

  ngAfterContentChecked() {
    let activeRoute = this.router.url.split('/')[1]
    if (activeRoute && this.bottomMenu[activeRoute]) {
      this.activeNavTop = this.router.url.split('/')[1]
      this.activeNavBottom === undefined && (this.activeNavBottom = this.bottomMenu[activeRoute][0].name);
    }
  }

  setActive(active: string, setBottom = false) {
    !setBottom ? () => {
      this.activeNavTop = active;
      this.activeNavBottom = this.bottomMenu[active][0].name;
    } : this.activeNavBottom = active;
  }
}
