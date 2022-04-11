import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-liste-restos',
  templateUrl: './liste-restos.component.html',
  styleUrls: ['./liste-restos.component.css']
})
export class ListeRestosComponent implements OnInit {
  @Output() isConnected=new EventEmitter<any>();
  loading=false;
  titre="Liste des restaurants"
  affichage=6;
  skip=0;
  restaurants: any;
  total=0;
  page=1;
  nbpages=0;
  recherche="";
  
  constructor(private httpClient:HttpClient, private app:AppComponent) { }

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
    this.loading=true;
    this.skip=this.affichage*(this.page-1);
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
      this.loading=false;
    },(err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  ngOnInit(): void {
    this.getList();
  }


}
