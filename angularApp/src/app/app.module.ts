import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListeRestosComponent } from './components/liste-restos/liste-restos.component';
import { TestComponent } from './components/test/test.component';
import { AffichageProfilComponent } from './components/affichage-profil/affichage-profil.component';
import { ClientComponent } from './components/client/client.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListePlatsComponent } from './components/liste-plats/liste-plats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListeRestosComponent,
    TestComponent,
    AffichageProfilComponent,
    ClientComponent,
    FooterComponent,
    ListePlatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
