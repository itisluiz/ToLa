import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { EventPageComponent } from './pages/event-page/event-page.component';
import { ArtistComponent } from './components/artist/artist.component';
import { CardUserFeedbackComponent } from './components/card-user-feedback/card-user-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeNavComponent,
    HomeCardComponent,
    FooterComponent,
    MainNavComponent,
    EventPageComponent,
    ArtistComponent,
    CardUserFeedbackComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
