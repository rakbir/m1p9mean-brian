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

  formulaire=new FormGroup(
    {
      mail:new FormControl(''),
      mdp:new FormControl('')
    })


  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  envoi(){
    var redirect="";
    var type="client";    

    if(this.router.url=='responsable/login'){
      redirect="responsable";
      type="responsable";
    }else if(this.router.url=="livreur/login"){
      type="livreur";
      redirect="livreur";
    }else if(this.router.url=="restaurant/login"){
      type="restaurant";
      redirect="restaurant/login";
    }
    this.formulaire.value.type=type;
    console.log(this.formulaire.value)

    const onError=()=>{
        alert('Il y a eu un problème au niveau de la connexion au serveur, veuillez réessayer');
    }

    this.httpClient.post(urls.login, this.formulaire.value)
      .subscribe((dataFromserver:any)=>{ 
        dataFromserver.status==1 ? this.router.navigateByUrl(redirect) : alert(dataFromserver.message);
      }, onError);
  }

  onSubmit(){
    this.envoi();
  }
}
