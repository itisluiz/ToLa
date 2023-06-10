import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { EventsHomeComponent } from './components/events-home/events-home.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'main', component: MainNavComponent},
  {path: 'events-home', component: EventsHomeComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'signin', component: SigninPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
