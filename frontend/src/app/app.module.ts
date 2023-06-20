import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { EventsHomeComponent } from './components/events-home/events-home.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyInfosComponent } from './components/my-infos/my-infos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeNavComponent,
    HomeCardComponent,
    FooterComponent,
    MainNavComponent,
    EventsHomeComponent,
    SignupPageComponent,
    SigninPageComponent,
    EditProfileComponent,
    MyInfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
