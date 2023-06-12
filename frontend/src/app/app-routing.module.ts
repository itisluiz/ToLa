import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'main', component: MainNavComponent},
  {path: 'event', component: EventPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
