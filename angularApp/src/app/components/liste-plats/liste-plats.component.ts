import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-liste-plats',
  templateUrl: './liste-plats.component.html',
  styleUrls: ['./liste-plats.component.css']
})
export class ListePlatsComponent implements OnInit {
  restaurant:any;
  plats:any;
  restaurant_id="";
  constructor(private route:ActivatedRoute, private httpClient: HttpClient) { }
  
  ajout(index:any){
    var aj=this.plats[index];
    delete aj.description;
    aj.nombre=parseInt((<HTMLInputElement>document.getElementById("_"+index)).value);
    (<HTMLInputElement>document.getElementById("_"+index)).value="1";
    var ls=localStorage.getItem("panier");
    var panier=[aj];
    if(ls!=null){
      var inserted=false;
      panier=JSON.parse(ls);
      var i=0;
      for(i=0; i<panier.length; i++){
        if(panier[i].libelle==aj.libelle && panier[i].restaurant==aj.restaurant){
          panier[i].nombre+=aj.nombre;
          inserted=true;
          break;
        }
      }
      if(!inserted){
        panier.push(aj);
      }
    }
    localStorage.setItem("panier", JSON.stringify(panier));
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.restaurant_id = params['restaurant'];
    });

    const onError=()=>{
      alert('Il y a eu un problème au niveau de la connexion au serveur');
    }

    this.httpClient.get(urls.carte_restaurant+'/'+this.restaurant_id)
    .subscribe((fromServer:any)=>{
      switch (fromServer.status){
        case 0:
          break;
        case 1:
          this.restaurant=fromServer.data.nom;
          this.plats=fromServer.data.plats;
          break;
      }
    }, onError); 
  }
}
