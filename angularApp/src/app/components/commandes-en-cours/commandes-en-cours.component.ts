import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-commandes-en-cours',
  templateUrl: './commandes-en-cours.component.html',
  styleUrls: ['./commandes-en-cours.component.css']
})
export class CommandesEnCoursComponent implements OnInit {
  commandes:any;
  constructor(private httpClient:HttpClient, private app:AppComponent) { }

  getCommandes(){
    this.httpClient.get(urls.en_cours, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.commandes=reponse.data;
          break;
      }
    }, this.app.onError)
  }

  prete(index:any){
    this.httpClient.get(urls.pret_pour_livraison+'/'+this.commandes[index]._id, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.commandes[index].etat="prêt à livrer";
          break;
      }
    }, this.app.onError)
  }

  ngOnInit(): void {
    this.getCommandes();
  }

}
