import { Component, ViewChild, AfterViewChecked} from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewChecked {
  faAngleDoubleRight = faAngleDoubleRight;
  @ViewChild('footer') footer;
  constructor(private router: Router) { }

  ngAfterViewChecked(): void {
    let activeRoute = this.router.url.split('/')[1]
    if(activeRoute === "szablon" || activeRoute === "podglad") {
      this.footer.nativeElement.style.display = 'none'
    } else {
      this.footer.nativeElement.style.display = 'block'
    }
  }
}
