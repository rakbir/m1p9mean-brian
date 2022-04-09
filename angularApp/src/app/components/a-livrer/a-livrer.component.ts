import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-a-livrer',
  templateUrl: './a-livrer.component.html',
  styleUrls: ['./a-livrer.component.css']
})
export class ALivrerComponent implements OnInit {

  commandes:any;

  constructor(private app:AppComponent , private httpClient:HttpClient) { }

  getCommandes(){
    this.httpClient.get(urls.a_livrer, {withCredentials:true})
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

  livraison(index:any){
    var commande_id=this.commandes[index]._id;
    this.httpClient.get(urls.livraison+'/'+commande_id, {withCredentials:true})
    .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            break;
          case 1:
            this.commandes[index].etat="livré";
            break;
        }
    }, this.app.onError)
  }

  ngOnInit(): void {
    this.getCommandes();
  }

}
