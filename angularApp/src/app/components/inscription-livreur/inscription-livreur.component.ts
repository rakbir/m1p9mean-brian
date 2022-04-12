import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';
import { LivreurComponent } from '../livreur/livreur.component';
import { ResponsableComponent } from '../responsable/responsable.component';

@Component({
  selector: 'app-inscription-livreur',
  templateUrl: './inscription-livreur.component.html',
  styleUrls: ['./inscription-livreur.component.css']
})
export class InscriptionLivreurComponent implements OnInit {
  loading=false;
  titre="Inscription"
  formulaire={
    nom:"",
    mail:"",
    mdp:"",
    type:"livreur"
  }
  constructor(
    @Optional() private livreur:LivreurComponent,
    @Optional() private responsable: ResponsableComponent,
    private http:HttpClient, private app:AppComponent, private router:Router) { }

  envoi(){
    if(this.formulaire.nom=="" || this.formulaire.mail=="" || this.formulaire.mdp==""){
      alert("Veuillez remplir tous les champs s'il vous plaît")
    }else{
      this.http.post(urls.inscription, this.formulaire, {withCredentials:true})
      .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            break;
          case 1:
            alert('Votre inscription a été prise en compte')
            break;
        }
      }, (err:any)=>{
        alert('Il y eu une erreur lors de la connexion au serveur');
        this.loading=false;
      })
    }
  }
  ngOnInit(): void {
    if(this.router.url=="/livreur/inscription"){
      if(this.livreur.connected){
        alert('Accès refusé');
        this.router.navigateByUrl('livreur');
      }  
    }
    if(this.router.url=="/responsable/inscription"){
      this.formulaire.type="responsable";
      if(this.responsable.connected){
        alert('Accès refusé');
        this.router.navigateByUrl('responsable');
      }  
    }
  }

  loginPage(){
    var redirect="livreur/login"
    if(this.router.url=="/responsable/inscription"){
      redirect='responsable/login';  
    }
    this.router.navigateByUrl(redirect);
  }

}
