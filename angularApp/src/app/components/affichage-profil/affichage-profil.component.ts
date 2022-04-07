import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-affichage-profil',
  templateUrl: './affichage-profil.component.html',
  styleUrls: ['./affichage-profil.component.css']
})
export class AffichageProfilComponent implements OnInit {

  username:any;

  constructor(private httpClient:HttpClient, private router: Router) { }

  ngOnInit(): void {
    const onError=()=>{
      alert('Il y a eu un problème au niveau de la connexion au serveur, veuillez réessayer');
    }

    this.httpClient.get(urls.user_session, {withCredentials:true})
    .subscribe((dataFromServer:any)=>{
       this.username=dataFromServer.nom;
    }, onError);

    

}
}
