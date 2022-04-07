import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirect="";
  type="client";

  formulaire=new FormGroup(
    {
      mail:new FormControl(''),
      mdp:new FormControl('')
    })


  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    if(this.router.url=='responsable/login'){
      this.redirect="responsable";
      this.type="responsable";
    }else if(this.router.url=="livreur/login"){
      this.type="livreur";
      this.redirect="livreur";
    }else if(this.router.url=="restaurant/login"){
      this.type="restaurant";
      this.redirect="restaurant/login";
    }  

    this.getUser();
  }

  getUser(){
    const onError=()=>{
      alert('Il y a eu un problème au niveau de la connexion au serveur');
    }
    this.httpClient.get(urls.user_session, {withCredentials:true})
    .subscribe((dataFromServer:any)=>{
      console.log(dataFromServer);
       dataFromServer.type == this.type ? this.router.navigateByUrl(this.redirect) : 0
    }, onError);
  }

  envoi(){
    this.formulaire.value.type=this.type;
    const onError=()=>{
        alert('Il y a eu un problème au niveau de la connexion au serveur, veuillez réessayer');
    }

    this.httpClient.post(urls.login, this.formulaire.value, {withCredentials:true})
      .subscribe((dataFromserver:any)=>{ 
        dataFromserver.status==1 ? this.router.navigateByUrl(this.redirect) : alert(dataFromserver.message);
      }, onError);
  }

  onSubmit(){
    this.envoi();
  }
}
