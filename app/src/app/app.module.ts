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
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ImagesComponent } from './portfolio/images/images.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BioComponent } from './portfolio/bio/bio.component';
import { SeoComponent } from './portfolio/seo/seo.component';

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
    SeoComponent
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
    BrowserAnimationsModule,
    InputFileModule.forRoot(config),
    TooltipModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
