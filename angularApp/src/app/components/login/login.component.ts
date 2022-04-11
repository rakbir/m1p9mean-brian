import { Component, OnInit, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import { ClientComponent } from '../client/client.component';
import { LivreurComponent } from '../livreur/livreur.component';
import { ResponsableComponent } from '../responsable/responsable.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading=false;
  redirect="";
  inscription="inscription";

  formulaire={
      mail:"",
      mdp:"",
      type:"client"
    }

    titre="Login";

  constructor(private router: Router, private httpClient: HttpClient, private app:AppComponent,
  @Optional() private client:ClientComponent,
  @Optional() private livreur:LivreurComponent,
  @Optional() private responsable:ResponsableComponent,
  @Optional() private restaurant:RestaurantComponent) { }

  ngOnInit(): void {
    var access=true;
    if(this.router.url=="/login"){
      if(this.client.connected){
        access=false;
      }
    }
    if(this.router.url=="/livreur/login"){ 
      if(this.livreur.connected){
        access=false;
      }
      this.formulaire.type="livreur";
      this.redirect="livreur";
      this.inscription="livreur/inscription";
    }else if(this.router.url=="/restaurant/login"){
      if(this.restaurant.connected){
        access=false;
      }
      this.formulaire.type="restaurant";
      this.redirect="restaurant";
      this.inscription="restaurant/inscription";
    }else if(this.router.url=="/responsable/login"){
      if(this.responsable.connected){
        access=false;
      }
      this.formulaire.type="responsable";
      this.redirect="responsable";
      this.inscription="/responsable/inscription";
    }
    if(access==false){
      alert('Accès refusé');
      this.router.navigateByUrl(this.redirect);
    }
  }

  envoi(){
    this.loading=true;
    if(this.formulaire.mail=="" || this.formulaire.mdp==""){
      alert("Veuillez remplir tous les champs s'il vous plaît")
      this.loading=false;
    }else{
      this.httpClient.post(urls.login, this.formulaire, {withCredentials:true})
      .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            alert(reponse.message)
            break;
          case 1:
            if(this.formulaire.type=="client"){
              this.client.connected=true;
              this.client.utilisateur=reponse.data;
            }
            if(this.formulaire.type=="responsable"){
              this.responsable.connected=true;
              this.responsable.utilisateur=reponse.data;
            }
            if(this.formulaire.type=="restaurant"){
              this.restaurant.connected=true;
              this.restaurant.utilisateur=reponse.data;
            }
            if(this.formulaire.type=="livreur"){
              this.livreur.connected=true;
              this.livreur.utilisateur=reponse.data;
            }
            this.router.navigateByUrl(this.redirect);
            break;
        }
        this.loading=false;
      }, (err:any)=>{
        alert('Il y eu une erreur lors de la connexion au serveur');
        this.loading=false;
      })
    }
  }

  inscriptionPage(){
    this.router.navigateByUrl(this.inscription);
  }
}
