import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALivrerComponent } from './components/a-livrer/a-livrer.component';
import { ClientComponent } from './components/client/client.component';
import { CommandesEnCoursComponent } from './components/commandes-en-cours/commandes-en-cours.component';
import { GestionPlatsComponent } from './components/gestion-plats/gestion-plats.component';
import { InscriptionClientComponent } from './components/inscription-client/inscription-client.component';
import { ListePlatsComponent } from './components/liste-plats/liste-plats.component';
import { ListeRestosComponent } from './components/liste-restos/liste-restos.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { LoginComponent } from './components/login/login.component';
import { MailOnlyLoginComponent } from './components/mail-only-login/mail-only-login.component';
import { PanierComponent } from './components/panier/panier.component';
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
        path:"commandes/panier",
        component:PanierComponent
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
        path:"login",
        component:MailOnlyLoginComponent
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
        component:MailOnlyLoginComponent
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
        path:"login",
        component:MailOnlyLoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
