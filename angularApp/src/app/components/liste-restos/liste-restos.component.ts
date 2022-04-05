import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-restos',
  templateUrl: './liste-restos.component.html',
  styleUrls: ['./liste-restos.component.css']
})
export class ListeRestosComponent implements OnInit {

  restaurants:any;
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    const onError=()=>{
      alert('Il y a eu un problème au niveau de la connexion au serveur, veuillez réessayer');
    }
    
    this.httpClient.get('http://localhost:3000/restaurants')
    .subscribe((dataFromServer:any)=>{
      this.restaurants=dataFromServer;
    },onError);
  }


}
