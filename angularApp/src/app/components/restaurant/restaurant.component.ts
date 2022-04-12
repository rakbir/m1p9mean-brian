import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Utilisateur } from 'src/app/util/Utilisateur';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  type="restaurant";
  utilisateur:any;

  connected=false;

  message={
    content:"",
    type:"erreur" //info , erreur, succès
  }
  liens=[
    {libelle:'Voir les commandes en cours', cible:"/restaurant/commandes", connect:true},
    {libelle: 'Gestion des plats', cible:"/restaurant/gestion-plats", connect:true},
    {libelle:"Recettes et bénéfices", cible:"", connect:true}
  ]
  constructor(private app:AppComponent, private router:Router) { }

  ngOnInit(): void {
    this.app.getUser(this.type)
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          this.message.content="Veuillez-vous connecter s'il vous plaît";
          this.router.navigateByUrl('restaurant/login')
          break;
        case 1:
          this.utilisateur=reponse.data;
          this.connected=true;
          break;
      }
    }, this.app.onError)
  }

  removeUser(){
    this.utilisateur={};
    this.connected=false;
  }
  removeAndredirect(){
    this.removeUser();
    this.router.navigateByUrl('/restaurant/login')
  }

}
