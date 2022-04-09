import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  type="resto";
  utilisateur:any;
  connected=false;
  message={
    content:"",
    type:"erreur" //info , erreur, succès
  }
  liens=[
    {libelle:'Voir les commandes en cours', cible:"restaurant/commandes", connect:true},
    {libelle: 'Gestion des plats', cible:"", connect:true},
    {libelle:"Recettes et bénéfices", cible:"", connect:true},
    {libelle:"Déconnexion", cible:"", connect:true}
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
  removeUtilisateur(){
    this.utilisateur=null;
    this.connected=false;
  }
}
