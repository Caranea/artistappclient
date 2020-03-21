import { Component, OnInit } from '@angular/core';
import { faPalette, faIcons, faLaptopCode, faHatWizard, faSlidersH } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  faPalette = faPalette;
  faIcons = faIcons;
  faLaptopCode = faLaptopCode;
  faHatWizard = faHatWizard;
  faSlidersH = faSlidersH;
  bottomMenu = {
    'artworks': [{ name: 'przeglądaj', path: 'prace' }, { name: 'dodaj nową', path: 'prace/dodaj' }]
  }
  activeNavTop = 'artworks'
  activeNavBottom = this.bottomMenu.artworks[0].name

  

  constructor() { }

  ngOnInit(): void {
  }

  setActive(active: string, setBottom = false) {
    !setBottom ? this.activeNavTop = active : this.activeNavBottom = active
  }
}
