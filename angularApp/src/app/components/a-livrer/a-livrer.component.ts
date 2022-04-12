import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';
import { LivreurComponent } from '../livreur/livreur.component';

@Component({
  selector: 'app-a-livrer',
  templateUrl: './a-livrer.component.html',
  styleUrls: ['./a-livrer.component.css']
})
export class ALivrerComponent implements OnInit {
  commandes:any;
  loading=false;
  titre="Les commandes prêtes à la livraison"
  constructor(private app:AppComponent , private httpClient:HttpClient, private livreur:LivreurComponent) { 
    this.commandes=[];
  }

  makeHumanReadable(date:any){
    return new Date(date).toLocaleString()
  }

  getCommandes(){
    this.loading=true;
    this.httpClient.get(urls.a_livrer, {withCredentials:true})
    .subscribe((reponse:any)=>{
      this.loading=false;
        switch(reponse.status){
            case 0:
              break;
            case 1:
                this.commandes=reponse.data;
              break;
            case 2:
              alert(reponse.message)
              this.livreur.removeAndredirect();
              break;
        }
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  livraison(index:any){
    var commande_id=this.commandes[index]._id;
    this.httpClient.get(urls.livraison+'/'+commande_id, {withCredentials:true})
    .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            alert(reponse.message);
            this.livreur.removeAndredirect();
            break;
          case 1:
            this.commandes[index].etat="livré";
            break;
          case 2:
              alert(reponse.message)
              this.livreur.removeAndredirect();
              break;
        }
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  ngOnInit(): void {
    this.getCommandes();
  }

}
