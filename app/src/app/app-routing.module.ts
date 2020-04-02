import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ArtworkAddComponent } from './artworks/artwork-add/artwork-add.component'
import { ArtworksComponent } from './artworks/artworks.component'
import { ArtworkSingleComponent } from './artworks/artwork-single/artwork-single.component'
import { ProfileComponent } from './profile/profile.component'
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component'
import { HomeComponent } from './home/home.component'
import { PortfolioComponent } from './portfolio/portfolio.component'
import { PreviewComponent } from './preview/preview.component'
import { SettingsComponent } from './settings/settings.component'
import { ThemesComponent } from './themes/themes.component'

const routes: Routes = [
  { path: 'portal', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'podglad', component: PreviewComponent },
  { path: 'szablon', component: ThemesComponent },
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ustawienia', component: SettingsComponent },
  { path: 'prace/dodaj', component: ArtworkAddComponent },
  { path: 'prace/edytuj/:id', component: ArtworkAddComponent },
  { path: 'prace', component: ArtworksComponent },
  { path: 'prace/:id', component: ArtworkSingleComponent },
  { path: 'profil/zobacz/:id', component: ProfileComponent },
  { path: 'profil/edytuj', component: ProfileEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
