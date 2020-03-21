import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ArtworkAddComponent } from './artworks/artwork-add/artwork-add.component'
import { ArtworksComponent } from './artworks/artworks.component'

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'prace/dodaj', component: ArtworkAddComponent },
  { path: 'prace', component: ArtworksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
