import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {
  type="responsable";
  utilisateur:any;
  connected=false;
  message={
    content:"",
    type:"erreur" //info , erreur, succès
  }
  inscription="responsable/inscription"

  liens=[
    {libelle:'Les commandes', cible:"/restaurant/voir-commandes", connect:true},
    // {libelle: 'Gestion des livreurs', cible:"", connect:true},
    // {libelle:"Gestion des restos", cible:"", connect:true},
    // {libelle:"Les bénéfices", cible:"", connect:true},
  ]

  constructor(private app:AppComponent, private router:Router) { }

  ngOnInit(): void {
    this.app.getUser(this.type)
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          this.message.content="Veuillez-vous connecter s'il vous plaît";
          this.router.navigateByUrl('responsable/login')
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
    this.router.navigateByUrl('/responsable/login')
  }

}
