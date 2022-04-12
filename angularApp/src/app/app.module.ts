import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListeRestosComponent } from './components/liste-restos/liste-restos.component';
import { AffichageProfilComponent } from './components/affichage-profil/affichage-profil.component';
import { ClientComponent } from './components/client/client.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListePlatsComponent } from './components/liste-plats/liste-plats.component';
import { InscriptionClientComponent } from './components/inscription-client/inscription-client.component';
import { VoirCommandesComponent } from './components/voir-commandes/voir-commandes.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { ALivrerComponent } from './components/a-livrer/a-livrer.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { GestionPlatsComponent } from './components/gestion-plats/gestion-plats.component';
import { CommandesEnCoursComponent } from './components/commandes-en-cours/commandes-en-cours.component';
import { ListeLivreursComponent } from './liste-livreurs/liste-livreurs.component';
import { InscriptionLivreurComponent } from './components/inscription-livreur/inscription-livreur.component';
import { InscriptionRestaurantComponent } from './components/inscription-restaurant/inscription-restaurant.component';
import { LiensComponent } from './components/liens/liens.component';
import { GestionRestaurantsComponent } from './components/gestion-restaurants/gestion-restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListeRestosComponent,
    AffichageProfilComponent,
    ClientComponent,
    FooterComponent,
    ListePlatsComponent,
    InscriptionClientComponent,
    VoirCommandesComponent,
    LivreurComponent,
    ResponsableComponent,
    ALivrerComponent,
    RestaurantComponent,
    GestionPlatsComponent,
    CommandesEnCoursComponent,
    ListeLivreursComponent,
    InscriptionLivreurComponent,
    InscriptionRestaurantComponent,
    LiensComponent,
    GestionRestaurantsComponent
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
