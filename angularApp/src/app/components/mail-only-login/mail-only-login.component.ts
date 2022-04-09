import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-mail-only-login',
  templateUrl: './mail-only-login.component.html',
  styleUrls: ['./mail-only-login.component.css']
})
export class MailOnlyLoginComponent implements OnInit {
  redirect="responsable";
  
  formulaire={
    mail:"",
    type:"responsable"
  }

constructor(private router:Router, private app:AppComponent, private httpClient:HttpClient) { }
  
  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url=="/livreur/login"){
      this.formulaire.type="livreur";
      this.redirect="livreur";
    }else if(this.router.url=="/restaurant/login"){
      this.formulaire.type="resto";
      this.redirect="restaurant";
    } 
  }

  envoi(){
    this.httpClient.post(urls.mail_login, this.formulaire, {withCredentials:true})
      .subscribe((fromServer:any)=>{
        switch(fromServer.status){
          case 0:
            alert(fromServer.message)
            break;
          case 1:
            this.router.navigateByUrl(this.redirect);
            break;
        }
      }, this.app.onError);
  }
}
