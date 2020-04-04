import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsiteService } from '../services/website.service'
import { AuthenticationService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";
import { first } from "rxjs/operators";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  currentUser;
  activeTheme;
  faArrowRight = faArrowRight;
  previewActive = true
  @ViewChild("theme1photo") theme1photo;

  constructor(
    private websiteService: WebsiteService,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }


  setTheme(theme) {
    this.previewActive = false
    this.activeTheme = theme;
    this.websiteService.changeTheme(this.currentUser._id, theme)
      .pipe(first())
      .subscribe((data: any) => {
        this.previewActive = true
      }, error => {
        this.alertService.error(error);
      })
  }

  changePhoto() {
    this.previewActive = false
    let file = this.theme1photo
    let file_ = file.files[0]
    setTimeout(() => {
      this.websiteService.changeTheme(this.currentUser._id, this.activeTheme, { photos: file_.preview })
        .pipe(first())
        .subscribe((data: any) => {
          this.previewActive = true
        }, error => {
          this.alertService.error(error);
        })
    }, 100);
  }
  ngOnInit(): void {
  }
}
