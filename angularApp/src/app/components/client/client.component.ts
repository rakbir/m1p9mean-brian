import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  type="client";
  utilisateur:any;
  connected=false;
  message={
    content:"",
    type:""
  }
  liens=[
    {libelle:"Les restaurants", cible:"/restaurants", connect:""}
  ]
  constructor(private app: AppComponent,private httpClient: HttpClient) {}
  
  ngOnInit(): void {
    this.app.getUser(this.type)
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.utilisateur=reponse.data.nom;
          this.connected=true;
          break;
      }
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
    })
  }

  removeUser(){
    this.utilisateur={};
    this.connected=false;
  }
}
