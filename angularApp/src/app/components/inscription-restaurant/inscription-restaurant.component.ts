import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-inscription-restaurant',
  templateUrl: './inscription-restaurant.component.html',
  styleUrls: ['./inscription-restaurant.component.css']
})
export class InscriptionRestaurantComponent implements OnInit {
  loading=false;
  titre="Inscription restaurant"
  formulaire={
    nom:"",
    mail:"",
    adresse:"",
    description:"",
    mdp:"",
    type:"restaurant"
  }
  constructor(private http:HttpClient, private router:Router, private app:AppComponent) { }

  envoi(){
    if(this.formulaire.nom=="" || this.formulaire.mail=="" || this.formulaire.mdp==""){
      alert("Veuillez remplir tous les champs précédés d'un '*' ");
    }else{
      this.loading=true;
      this.http.post(urls.inscription, this.formulaire, {withCredentials:true})
      .subscribe((reponse:any)=>{
        switch(reponse.status){
          case 0:
            break;
          case 1:
            alert('Votre inscription est validée')
            this.formulaire.nom="";
            this.formulaire.adresse="";
            this.formulaire.mail="";
            this.formulaire.description="";
            this.formulaire.mdp=""
            break;
        }
        this.loading=false;
      }, (err:any)=>{
        alert('Il y eu une erreur lors de la connexion au serveur');
        this.loading=false;
      })
    }
  }

  loginPage(){
    this.router.navigateByUrl("restaurant/login");
  }

  ngOnInit(): void {
  }

}
