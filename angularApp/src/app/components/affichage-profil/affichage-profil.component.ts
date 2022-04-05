import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affichage-profil',
  templateUrl: './affichage-profil.component.html',
  styleUrls: ['./affichage-profil.component.css']
})
export class AffichageProfilComponent implements OnInit {

  user:any;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
/*    this.httpClient.get('http://localhost:3000/utilisateurs/session')*/
    
  }

}
