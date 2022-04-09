import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  message={
    msg:"",
    type:""
  }

  onError=()=>{
    alert('Il y a eu un problème lors de la connexion au serveur')
  }

  constructor(private httpClient:HttpClient){}

  getUser(type:string){
    return this.httpClient.get(urls.user_session+'/'+type, {withCredentials:true})
  }

  ngOnInit(): void {}

}
