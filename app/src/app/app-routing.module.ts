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
import { SuccessComponent } from './success/success.component'
import { CancelledComponent } from './cancelled/cancelled.component'
import { AuthGuardService } from './guard/guard'
import {AdminGuardService} from './guard/adminGuard'
import { ResetComponent } from './reset/reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DomenaComponent } from './domena/domena.component';
import { PromoComponent } from './promo/promo.component';

const routes: Routes = [
  { path: 'portal', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'portfolio/sukces', component: SuccessComponent, canActivate: [AuthGuardService] },
  { path: 'portfolio/blad', component: CancelledComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuardService] },
  { path: 'podglad', component: PreviewComponent, canActivate: [AuthGuardService] },
  { path: 'szablon', component: ThemesComponent, canActivate: [AuthGuardService] },
  { path: 'domena', component: DomenaComponent, canActivate: [AuthGuardService] },
  { path: 'promocja', component: PromoComponent, canActivate: [AuthGuardService] },
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'reset/:token', component: NewPasswordComponent },
  { path: 'ustawienia', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'prace/dodaj', component: ArtworkAddComponent, canActivate: [AuthGuardService] },
  { path: 'prace/edytuj/:id', component: ArtworkAddComponent, canActivate: [AuthGuardService] },
  { path: 'prace', component: ArtworksComponent, canActivate: [AuthGuardService] },
  { path: 'prace/:id', component: ArtworkSingleComponent, canActivate: [AuthGuardService] },
  { path: 'profil/zobacz/:id', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profil/edytuj', component: ProfileEditComponent, canActivate: [AuthGuardService] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuardService] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AdminGuardService]
})
export class AppRoutingModule { }
