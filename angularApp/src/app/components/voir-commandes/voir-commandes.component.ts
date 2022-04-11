import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';
import { ResponsableComponent } from '../responsable/responsable.component';

@Component({
  selector: 'app-voir-commandes',
  templateUrl: './voir-commandes.component.html',
  styleUrls: ['./voir-commandes.component.css']
})
export class VoirCommandesComponent implements OnInit {
  titre="Toutes les commandes";
  affichage=6;
  skip=0;
  total=0;
  page=1;
  nbpages=0;
  loading=false;
  liste:any;

  dates={
    debut:"",
    fin:""
  }

  dateDebut="";
  dateFin="";

  constructor(private httpClient:HttpClient, private app:AppComponent, private responsable:ResponsableComponent) {
    this.liste=[];
  }

  configDates(){
    var date=new Date()
    var complet=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    this.dates.debut= this.dates.debut==""?new Date(complet).toISOString():new Date(this.dates.debut).toISOString()
    this.dates.fin= this.dates.fin==""?new Date(complet).toISOString():new Date(this.dates.fin).toISOString()
    this.dateDebut=new Date(this.dates.debut).toLocaleDateString();
    this.dateFin=new Date(this.dates.fin).toLocaleDateString();
  }

  formatListDates(){
    var i=0;
    for(i=0; i<this.liste.length; i++){
      var date=new Date(this.liste[i].commande_date).toLocaleDateString();
      this.liste[i].commande_date=date;
    }
  }

  precedent():void{
    this.page--;
    this.findCommandes();
  }

  suivant():void{
    this.page++;
    this.findCommandes();
  }
  
  // selectPage(selectedPage: any): void {
  //   this.page=selectedPage;
  //   this.findCommandes();
  // }



  findCommandes(){
    this.loading=true;
    this.skip=this.affichage*(this.page-1);
    this.configDates();

    this.httpClient.get(urls.liste_commandes
      +'?debut='+this.dates.debut.replace("T00:00:00.000Z","")
      +'&fin='+this.dates.fin.replace("T00:00:00.000Z","")
      +'&skip='+this.skip
      +'&limit='+this.affichage
      ,{withCredentials:true})
    .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            break;
          case 1:
            this.liste=reponse.data.commandes;
            this.total=reponse.data.total;
            this.nbpages=(this.total%this.affichage)==0 ? (this.total/this.affichage) : Math.floor(this.total/this.affichage)+1;
            break;
          case 2:
            alert(reponse.message);
            this.responsable.removeAndredirect();
            break;
        }
        this.loading=false;
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }
  makeHumanReadable(date:any){
    return new Date(date).toLocaleDateString()
  }

  ngOnInit(): void {
    this.findCommandes();
  }
}