import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { urls } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirect="";
  
  formulaire=new FormGroup({
      mail:new FormControl(''),
      mdp:new FormControl('')
    })


  constructor(private router: Router, private httpClient: HttpClient, private app:AppComponent) { }

  ngOnInit(): void {
  }

  envoi(){
    this.httpClient.post(urls.login, this.formulaire.value, {withCredentials:true})
      .subscribe((fromServer:any)=>{
        switch(fromServer.status){
          case 0:
            alert(fromServer.message)
            break;
          case 1:
            this.router.navigateByUrl(this.redirect);
            sessionStorage.setItem("utilisateur", JSON.stringify(fromServer.data.user))
            break;
        }
      }, this.app.onError);
  }

  onSubmit(){
    this.envoi();
  }

  inscriptionPage(){
    this.router.navigateByUrl('/inscription');
  }

}
