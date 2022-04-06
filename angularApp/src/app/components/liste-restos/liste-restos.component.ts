import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from '../../injectable/variablesGlobales';

@Component({
  selector: 'app-liste-restos',
  templateUrl: './liste-restos.component.html',
  styleUrls: ['./liste-restos.component.css']
})
export class ListeRestosComponent implements OnInit {

  affichage=6;
  skip=0;
  restaurants: any;
  total=0;
  page=1;
  nbpages=0;
  
  constructor(private httpClient:HttpClient) { }

  precedent():void{
    this.page--;
    this.getList();
  }

  suivant():void{
    this.page++;
    this.getList();
  }
  
  selectPage(selectedPage: any): void {
    this.page=selectedPage;
    this.getList();
  }

  getList():void{
    this.skip=this.affichage*(this.page-1);
    const onError=()=>{
      alert('Il y a eu un problème au niveau de la connexion au serveur, veuillez réessayer');
    }
    
    var t="http://localhost:3000/restaurants/liste/"+this.affichage+"/"+this.skip;
    this.httpClient.get(t)
    .subscribe((dataFromServer:any)=>{
      this.restaurants=dataFromServer.restaurants;
      this.total=dataFromServer.total;
      this.nbpages=(this.total%this.affichage)==0 ? (this.total/this.affichage) : Math.floor(this.total/this.affichage)+1 ;
    },onError);
  }

  ngOnInit(): void {
    this.getList();
  }


}
