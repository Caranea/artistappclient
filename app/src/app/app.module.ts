import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { ArtworkAddComponent } from './artworks/artwork-add/artwork-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { CookieService } from 'ngx-cookie-service';
import { ArtworkSingleComponent } from './artworks/artwork-single/artwork-single.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';
import { NguCarouselModule } from '@ngu/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ImagesComponent } from './portfolio/images/images.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BioComponent } from './portfolio/bio/bio.component';
import { SeoComponent } from './portfolio/seo/seo.component';
import { PreviewComponent } from './preview/preview.component';
import { SafePipe } from './pipes/safe.pipe';
import { SettingsComponent } from './settings/settings.component';
import { ThemesComponent } from './themes/themes.component';
import { FooterComponent } from './footer/footer.component';
import { SuccessComponent } from './success/success.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { ResetComponent } from './reset/reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DomenaComponent } from './domena/domena.component';
import { PromoComponent } from './promo/promo.component';
import { FawComponent } from './faw/faw.component'

const config: InputFileConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AlertComponent,
    LoginComponent,
    NavbarTopComponent,
    MainNavComponent,
    ArtworksComponent,
    ArtworkAddComponent,
    ArtworkSingleComponent,
    ProfileComponent,
    ProfileEditComponent,
    HomeComponent,
    PortfolioComponent,
    ImagesComponent,
    BioComponent,
    SeoComponent,
    PreviewComponent,
    SafePipe,
    SettingsComponent,
    ThemesComponent,
    FooterComponent,
    SuccessComponent,
    CancelledComponent,
    ResetComponent,
    NewPasswordComponent,
    AdminPanelComponent,
    DomenaComponent,
    PromoComponent,
    FawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NguCarouselModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    InputFileModule.forRoot(config),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [SafePipe],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
