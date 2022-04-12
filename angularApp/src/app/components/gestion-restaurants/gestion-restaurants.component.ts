import { Component, OnInit } from '@angular/core';
import { ResponsableComponent } from '../responsable/responsable.component';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-gestion-restaurants',
  templateUrl: './gestion-restaurants.component.html',
  styleUrls: ['./gestion-restaurants.component.css']
})
export class GestionRestaurantsComponent implements OnInit {
  titre="Gestion des restaurants";
  loading=false;
  restaurants:any;
  skip=0;
  total=0;
  page=1;
  nbPages=0;
  affichage=6;

  constructor(private responsable: ResponsableComponent, private http:HttpClient) {
    this.restaurants=[]
  }
   
  precedent():void{
    this.page--;
    this.getRestaurants();
  }

  suivant():void{
    this.page++;
    this.getRestaurants();
  }

  getRestaurants(){
    this.loading=true;
    this.skip=this.affichage*(this.page-1);
    this.http.get(urls.liste_restaurants+'/'+this.affichage+'/'+this.skip, {withCredentials:true})
    .subscribe((reponse:any)=>{
       alert(reponse.message);
       switch(reponse.status){
         case 0:
           break;
         case 1:
           this.restaurants=reponse.data.livreurs;
           this.total=reponse.data.total;
           this.nbPages=(this.total%this.affichage)==0 ? (this.total/this.affichage) : Math.floor(this.total/this.affichage)+1;
           break;
         case 2:
           this.responsable.removeAndredirect()
           break;            
       }
       this.loading=false;
    }, (err:any)=>{
     alert('Il y eu une erreur lors de la connexion au serveur');
     this.loading=false;
    })
  }

 supprimer(index:any){
  this.http.get(urls.supprimer_liveur+'/'+this.restaurants[index]._id, {withCredentials:true})
  .subscribe((reponse:any)=>{
    alert(reponse.message);
    switch(reponse.status){
      case 0:
        break;
      case 1:
        this.restaurants.splice(index);
        this.total--;
        this.nbPages=(this.total%this.affichage)==0 ? (this.total/this.affichage) : Math.floor(this.total/this.affichage)+1;
        break;
      case 2:
        this.responsable.removeAndredirect()
        break;            
    }
    this.loading=false;
 }, (err:any)=>{
  alert('Il y eu une erreur lors de la connexion au serveur');
  this.loading=false;
 })
}

  ngOnInit(): void {
  }

}
