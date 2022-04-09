import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier:any;
  total=0;
  isConnecte:boolean=false ;
  
  constructor(private httpClient: HttpClient) { }
   
  calculTotal(){
    var i=0; this.total=0;
    for(i=0; i<this.panier.length; i++){
      this.total+=(this.panier[i].nombre * this.panier[i].prix)
    }
  }

  ajout(index:any){
    this.panier[index].nombre++;
    localStorage.setItem('panier', JSON.stringify(this.panier));   
    this.calculTotal();
  }

  suppression(index:any){
    this.panier[index].nombre--;
    if(this.panier[index].nombre==0){
      this.panier.splice(index, 1);
    }
    localStorage.setItem('panier', JSON.stringify(this.panier))
    this.calculTotal();
  }

  ngOnInit(): void {
    var pan=localStorage.getItem("panier");
    if(pan==null){
      localStorage.setItem("panier", JSON.stringify([]))
    }else{
      this.panier=JSON.parse(pan);
      this.calculTotal();
    }
  }

  validation(){
    const onError=()=>{
      alert('Il y a eu un problème lors de la connexion au servevr')
    }

    this.httpClient.post(urls.nouvelle_commande, this.panier, {withCredentials:true})
    .subscribe((fromServer:any)=>{
      switch(fromServer.status){
        case 0:
          alert(fromServer.message)
          break;
        case 1:
          localStorage.setItem("panier", JSON.stringify([]));
          this.panier=[];
          alert(fromServer.message)
          break;
        case 3:
          alert('Veuillez-vous connecter pour valider votre commande')
          break;
      }
    }, onError)
  } 
}
