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
  restaurant:any;
  plats:any;
  restaurant_id="";
  constructor(private route:ActivatedRoute,
              private httpClient: HttpClient,
              private app:AppComponent) { }
  
  commander(index:any){
    var plat={
      restaurant:{ nom : this.restaurant, id: this.restaurant_id},
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
          
          break;
      }
    }, this.app.onError);
  }

  findPlats(){
    this.httpClient.get(urls.carte_restaurant+'/'+this.restaurant_id)
    .subscribe((reponse:any)=>{
      switch (reponse.status){
        case 0:
          break;
        case 1:
          this.restaurant=reponse.data.nom;
          this.plats=reponse.data.plats;
          break;
      }
    }, this.app.onError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.restaurant_id = params['restaurant'];
    });
    this.findPlats();
  }
}
