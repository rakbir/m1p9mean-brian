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
import { PanierComponent } from './components/panier/panier.component';
import { InscriptionClientComponent } from './components/inscription-client/inscription-client.component';
import { VoirCommandesComponent } from './components/voir-commandes/voir-commandes.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { ALivrerComponent } from './components/a-livrer/a-livrer.component';
import { MailOnlyLoginComponent } from './components/mail-only-login/mail-only-login.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { GestionPlatsComponent } from './components/gestion-plats/gestion-plats.component';
import { CommandesEnCoursComponent } from './components/commandes-en-cours/commandes-en-cours.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListeRestosComponent,
    TestComponent,
    AffichageProfilComponent,
    ClientComponent,
    FooterComponent,
    ListePlatsComponent,
    PanierComponent,
    InscriptionClientComponent,
    VoirCommandesComponent,
    LivreurComponent,
    ResponsableComponent,
    ALivrerComponent,
    MailOnlyLoginComponent,
    RestaurantComponent,
    GestionPlatsComponent,
    CommandesEnCoursComponent,
    AlertComponent
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
