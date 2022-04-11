import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.css']
})
export class InscriptionClientComponent implements OnInit {
  loading=false;
  titre="Inscription client"
  formulaire={
    nom:"",
    prenom:"",
    adresse:"",
    mail:"",
    mdp:"",
    type:"client"
  }
  constructor(private app:AppComponent, private httpClient: HttpClient, private router:Router) { }

  envoi(){
    this.loading=true
    if(this.formulaire.nom=="" || 
      this.formulaire.adresse=="" ||
      this.formulaire.mail=="" ||
      this.formulaire.mdp==""){
        alert("Veuillez remplir tous les champs précédés d'un '*'")
        this.loading=false;
    }else{
      this.httpClient.post(urls.inscription, this.formulaire, {withCredentials:true})
      .subscribe((reponse:any)=>{
          switch(reponse.status){
            case 0:
              break;
            case 1:
              alert('Votre inscription a été validée');
              this.formulaire.nom="";
              this.formulaire.prenom="";
              this.formulaire.adresse="";
              this.formulaire.mdp="";
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
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {

  }

}
