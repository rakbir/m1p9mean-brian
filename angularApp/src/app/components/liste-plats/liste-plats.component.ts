import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-liste-plats',
  templateUrl: './liste-plats.component.html',
  styleUrls: ['./liste-plats.component.css']
})
export class ListePlatsComponent implements OnInit {
  loading=true;
  restaurant:any;
  plats:any;
  restaurant_id="";
  constructor(private route:ActivatedRoute,
              private httpClient: HttpClient,
              private app:AppComponent) {
  this.restaurant={};
  this.plats=[];
              }
  
  commander(index:any){
    var plat={
      restaurant:{ nom : this.restaurant.nom, id: this.restaurant_id},
      libelle:this.plats[index].libelle,
      prix:this.plats[index].prix,
      nombre:0
    };
    plat.nombre=parseInt((<HTMLInputElement>document.getElementById("_"+index)).value);
    (<HTMLInputElement>document.getElementById("_"+index)).value="1";
    
    this.httpClient.post(urls.nouvelle_commande, plat, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch (reponse.status){
        case 0:
          break;
        case 1:
            alert("Commande enregistrée")
          break;
        case 2:
          alert("Veuillez vous connecter pour commander s'il vous plaît");
      }
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  findRestaurant(){
    this.loading=true;
    this.httpClient.get(urls.info_restaurant+'/'+this.restaurant_id, {withCredentials:true})
    .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            alert(reponse.message);
            break;
          case 1:
            this.restaurant=reponse.data;
            break;
        }
      this.loading=false;
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  findPlats(){
    this.loading=true;
    this.httpClient.get(urls.carte_restaurant+'/'+this.restaurant_id, {withCredentials:true})
    .subscribe((reponse:any)=>{
      switch (reponse.status){
        case 0:
          break;
        case 1:
          this.plats=reponse.data;
          break;
      }
      this.loading=false;
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.restaurant_id = params['restaurant'];
    });
    this.findRestaurant();
    this.findPlats();
  }
}
