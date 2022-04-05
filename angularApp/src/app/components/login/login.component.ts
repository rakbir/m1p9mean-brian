import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulaireConnexion={
    mail:new FormControl('nomutilisateur@mail.com'),
    mdp:new FormControl(''),
    type:""
  }

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  envoi(){
  const onError=()=>{
      alert('Il y a eu un problème au niveau de la connexion au serveur, veuillez réessayer');
  }
    this.httpClient.post(urls.login, {mail:this.formulaireConnexion.mail.value, mdp:this.formulaireConnexion.mdp.value, type:this.formulaireConnexion.type})
      .subscribe((dataFromserver:any)=>{ 
        console.log(dataFromserver);
        /*switch (dataFromserver.meta.status) {

        case 0:
          localStorage.setItem("admin-session", JSON.stringify(dataFromserver.data));
          this.router.navigateByUrl('admin');
          break;
        case 1:
          alert(dataFromserver.meta.message);
          break;
      }*/
    }, onError);
  }
}
