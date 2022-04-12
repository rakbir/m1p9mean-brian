import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { urls } from 'src/environments/environment';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-liste-livreurs',
  templateUrl: './liste-livreurs.component.html',
  styleUrls: ['./liste-livreurs.component.css']
})
export class ListeLivreursComponent implements OnInit {

  formulaireLivreur={
    nom:"",
    mail:"",
    mdp:""
  }
  livreurs:any;

  constructor(private http:HttpClient, private app:AppComponent) { }

  getLivreurs(){
    this.http.get(urls.liste_livreurs, {withCredentials:true})
    .subscribe((reponse:any)=>{
      if(reponse.status==1){
        this.livreurs=reponse.data;
      }
    }, this.app.onError);
  }

  ngOnInit(): void {

  }

}
