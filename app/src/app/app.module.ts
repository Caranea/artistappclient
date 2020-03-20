import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { ArtworkAddComponent } from './artworks/artwork-add/artwork-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
 
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
    ArtworkAddComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,        
    BrowserAnimationsModule,
    InputFileModule.forRoot(config),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
