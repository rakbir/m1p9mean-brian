import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {
  type="livreur";
  utilisateur:any;
  connected=false;
  loading=false;

  message={
    content:"",
    type:"erreur" //info , erreur, succès
  }

  constructor(private app:AppComponent, private router:Router, private http:HttpClient) {}


  ngOnInit(): void {
    this.app.getUser(this.type)
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          this.message.content="Veuillez-vous connecter s'il vous plaît";
          this.router.navigateByUrl('livreur/login')
          break;
        case 1:
          this.utilisateur=reponse.data;
          this.connected=true;
          break;
      }
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  deconnexion(){
    this.loading=true;
    this.http.get(urls.deconnexion, {withCredentials:true})
    .subscribe((reponse:any)=>{
        alert('Succès de la déconnexion');
        this.removeAndredirect()
        this.loading=false;
    }, (err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }

  removeUser(){
    this.utilisateur={};
    this.connected=false;
  }

  removeAndredirect(){
    this.removeUser();
    this.router.navigateByUrl('/livreur/login')
  }

}
