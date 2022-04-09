import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-affichage-profil',
  templateUrl: './affichage-profil.component.html',
  styleUrls: ['./affichage-profil.component.css']
})
export class AffichageProfilComponent implements OnInit {

  @Input() username:any;

  constructor(private app:AppComponent) { }

  deconnexion(){ 
    localStorage.removeItem("panier")
  }
  
  ngOnInit(): void {
  }
}
