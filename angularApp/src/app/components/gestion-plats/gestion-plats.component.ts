import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-gestion-plats',
  templateUrl: './gestion-plats.component.html',
  styleUrls: ['./gestion-plats.component.css']
})
export class GestionPlatsComponent implements OnInit {
  loading=false;
  ajout=false;
  plats:any;
  recherche="";
  plat={
    libelle:"",
    prix:"",
    description:""
  }
  titre="Mes plats"

  constructor(private restaurant:RestaurantComponent, private httpClient:HttpClient, private app:AppComponent) {
    this.plats=[];
  }
  switchAjout(){
    this.ajout=!this.ajout;
  }

  enregistrerPlat(){
    this.loading=true;
    if(this.plat.libelle==""){
        alert("Veuillez renseigner le nom du plat")
        this.loading=false;
    }
    else if(this.plat.prix==""){
        alert('Veuillez renseigner le prix du plat')
        this.loading=false;
    }else{
      var p={libelle:this.plat.libelle, prix:this.plat.prix, description:this.plat.description};
      this.httpClient.post(urls.nouveau_plat, this.plat, {withCredentials:true})
      .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            break;
          case 1:
            alert('Le plat est enregistré')
            this.plat.libelle="";
            this.plat.prix="";
            this.plat.description="";
            this.plats.push(p)
            this.loading=false;
            break;
          case 2:
            alert(reponse.message)
            this.restaurant.removeAndredirect()
            break;
        }
      }, (err:any)=>{
        alert('Il y eu une erreur lors de la connexion au serveur');
        this.loading=false;
      })
    }
  }

  recherchePlat(){
    // this.httpClient.get()
  }
  supprimer(index:any){
    this.loading=true;
    this.httpClient.get(urls.supprimer_plat+'/'+this.plats[index]._id, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          alert('Le plat est supprimé')
          this.plats.splice(index)
          break;
        case 2:
            alert(reponse.message)
            this.restaurant.removeAndredirect()
            break;
      }
      this.loading=false;
    },(err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }
  getPlats(){
    this.loading=true;
    this.httpClient.get(urls.liste_plats, {withCredentials:true})
    .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            break;
          case 1:
            this.plats=reponse.data;
            break;
          case 2:
            alert(reponse.message)
            this.restaurant.removeAndredirect()
            break;
        }
        this.loading=false;
    },(err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  ngOnInit(): void {
    this.getPlats();
  }

}
