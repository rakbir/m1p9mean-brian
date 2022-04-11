import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-commandes-en-cours',
  templateUrl: './commandes-en-cours.component.html',
  styleUrls: ['./commandes-en-cours.component.css']
})
export class CommandesEnCoursComponent implements OnInit {
  titre="Commandes en cours";
  commandes:any;
  loading=false;
  constructor(private httpClient:HttpClient, private app:AppComponent, private router:Router,
    private restaurant:RestaurantComponent) {
    this.commandes=[];
  }
  makeHumanReadable(date:any){
    return new Date(date).toLocaleString()
  }

  getCommandes(){
    this.loading=true;
    this.httpClient.get(urls.en_cours, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.commandes=reponse.data;
          break;
        case 2:
          alert(reponse.message)
          this.restaurant.removeAndredirect()
          break;
      }
      this.loading=false;
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  prete(index:any){
    this.loading=true;
    this.httpClient.get(urls.pret_pour_livraison+'/'+this.commandes[index]._id, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.commandes[index].etat="prête";
          break;
        case 2:
            alert(reponse.message)
            this.restaurant.removeAndredirect()
            break;
      }
      this.loading=false;
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  ngOnInit(): void {
    this.getCommandes();
  }

}
