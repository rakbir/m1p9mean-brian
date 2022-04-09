import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-liste-restos',
  templateUrl: './liste-restos.component.html',
  styleUrls: ['./liste-restos.component.css']
})
export class ListeRestosComponent implements OnInit {
  @Output() isConnected=new EventEmitter<any>();
  
  affichage=6;
  skip=0;
  restaurants: any;
  total=0;
  page=1;
  nbpages=0;
  
  constructor(private httpClient:HttpClient) { }

  changeState(){
    this.isConnected.emit();
  }


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
    
    this.httpClient.get(urls.liste_restaurants+"/"+this.affichage+"/"+this.skip)
    .subscribe((fromServer:any)=>{
      switch(fromServer.status){
        case 0:
          break;
        case 1:
          this.restaurants=fromServer.data.restaurants;
          this.total=fromServer.data.total;
          this.nbpages=(this.total%this.affichage)==0 ? (this.total/this.affichage) : Math.floor(this.total/this.affichage)+1;
          break;
      }
    },onError);
  }

  ngOnInit(): void {
    this.getList();
  }


}
