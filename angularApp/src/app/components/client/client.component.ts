import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

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
    content:"test",
    type:"succes"
  }
  liens=[
    {libelle:"Déconnexion", cible:"", connect:true}
  ]
  constructor(private app: AppComponent,private httpClient: HttpClient) {}
  
  ngOnInit(): void {
    this.app.getUser(this.type)
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          break;
        case 1:
          this.utilisateur=reponse.data;
          this.connected=true;
          break;
      }
    }, this.app.onError)
  }

  removeUtilisateur(){
    this.utilisateur=null;
    this.connected=false;
  }
}
