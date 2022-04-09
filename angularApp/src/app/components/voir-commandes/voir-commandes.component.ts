import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-voir-commandes',
  templateUrl: './voir-commandes.component.html',
  styleUrls: ['./voir-commandes.component.css']
})
export class VoirCommandesComponent implements OnInit {

  liste:any;

  dates={
    debut:"",
    fin:""
  }

  dateDebut="";
  dateFin="";

  constructor(private httpClient:HttpClient, private app:AppComponent) {}

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

  findDetails(id:any){
    alert(id)
  }

  findCommandes(){
    this.configDates();

    // this.httpClient.get(urls.mes_commandes+'?debut='+this.dates.debut.replace("T00:00:00.000Z","")+'&fin='+this.dates.fin.replace("T00:00:00.000Z",""), {withCredentials:true})
    // .subscribe((reponse:any)=>{
    //     switch(reponse.status){
    //       case 0:
    //         break;
    //       case 1:
    //         this.liste=reponse.data;
    //         this.formatListDates()
    //         break;
    //       case 2:
    //         this.app.changeEtat(false, {});
    //         break;
    //     }
    // }, this.app.onError)
  }

  ngOnInit(): void {
    this.findCommandes();
  }
}