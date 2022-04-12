import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALivrerComponent } from './components/a-livrer/a-livrer.component';
import { ClientComponent } from './components/client/client.component';
import { CommandesEnCoursComponent } from './components/commandes-en-cours/commandes-en-cours.component';
import { GestionPlatsComponent } from './components/gestion-plats/gestion-plats.component';
import { GestionRestaurantsComponent } from './components/gestion-restaurants/gestion-restaurants.component';
import { InscriptionClientComponent } from './components/inscription-client/inscription-client.component';
import { InscriptionLivreurComponent } from './components/inscription-livreur/inscription-livreur.component';
import { InscriptionRestaurantComponent } from './components/inscription-restaurant/inscription-restaurant.component';
import { ListeLivreursComponent } from './components/liste-livreurs/liste-livreurs.component';
import { ListePlatsComponent } from './components/liste-plats/liste-plats.component';
import { ListeRestosComponent } from './components/liste-restos/liste-restos.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { LoginComponent } from './components/login/login.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { VoirCommandesComponent } from './components/voir-commandes/voir-commandes.component';

const routes: Routes = [
  {
    path:"",
    component:ClientComponent,
    children:[
      {
       path:"",
       component:ListeRestosComponent 
      },
      {
        path:"restaurants",
        component:ListeRestosComponent
      },
      {
        path:"restaurants/:restaurant/carte",
        component:ListePlatsComponent
      },
      {
        path:"commandes/voir",
        component:VoirCommandesComponent
      },
      {
        path:"inscription",
        component:InscriptionClientComponent
      },
      {
        path:"login",
        component:LoginComponent
      }    
    ],
  },
  {
    path:"responsable",
    component:ResponsableComponent,
    children:[
      {
        path:"",
        component:VoirCommandesComponent
      },
      {
        path:"voir-commandes",
        component:VoirCommandesComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"inscription",
        component:InscriptionLivreurComponent
      },
      {
        path:"gestion-livreurs",
        component:ListeLivreursComponent
      },
      {
        path:"gestion-restaurants",
        component:GestionRestaurantsComponent
      }
    ]
  },
  {
    path:"restaurant",
    component:RestaurantComponent,
    children:[
      {
        path:"",
        component:CommandesEnCoursComponent
      },
      {
        path:"gestion-plats",
        component:GestionPlatsComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"inscription",
        component:InscriptionRestaurantComponent
      },
      {
        path:"commandes",
        component:CommandesEnCoursComponent
      }
    ]
  },
  {
    path:"livreur",
    component:LivreurComponent,
    children:[
      {
        path:"",
        component:ALivrerComponent
      },
      {
        path:"a-livrer",
        component:ALivrerComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"inscription",
        component:InscriptionLivreurComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
