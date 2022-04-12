import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/environment';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { ResponsableComponent } from '../responsable/responsable.component';

@Component({
  selector: 'app-liste-livreurs',
  templateUrl: './liste-livreurs.component.html',
  styleUrls: ['./liste-livreurs.component.css']
})
export class ListeLivreursComponent implements OnInit {
  titre="Gestion des livreurs";
  loading=false;
  livreurs:any;
  skip=0;
  total=0;
  page=1;
  nbPages=0;
  affichage=6;


  constructor(private responsable: ResponsableComponent, private http:HttpClient) {
    this.livreurs=[]
   }

   
  precedent():void{
    this.page--;
    this.getLivreurs();
  }

  suivant():void{
    this.page++;
    this.getLivreurs();
  }

  getLivreurs(){
     this.loading=true;
     this.skip=this.affichage*(this.page-1);
     this.http.get(urls.liste_livreurs+'/'+this.affichage+'/'+this.skip, {withCredentials:true})
     .subscribe((reponse:any)=>{
        alert(reponse.message);
        switch(reponse.status){
          case 0:
            break;
          case 1:
            this.livreurs=reponse.data.livreurs;
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
    this.http.get(urls.supprimer_liveur+'/'+this.livreurs[index]._id, {withCredentials:true})
    .subscribe((reponse:any)=>{
      alert(reponse.message);
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.livreurs.splice(index);
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
