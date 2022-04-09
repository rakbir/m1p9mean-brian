import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';

@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.css']
})
export class InscriptionClientComponent implements OnInit {

  formulaire=new FormGroup({
    nom:new FormControl(''),
    prenom:new FormControl(''),
    adresse:new FormControl(''),
    mail:new FormControl(''),
    mdp:new FormControl('')
  })
  constructor(private app:AppComponent, private httpClient: HttpClient, private router:Router) { }

  onSubmit(){
    this.formulaire.value.type="client";
    this.httpClient.post(urls.inscription, this.formulaire.value, {withCredentials:true})
    .subscribe((fromServer:any)=>{
        switch(fromServer.status){
          case 0:
            break;
          case 1:
            this.router.navigateByUrl('login')
            break;
        }
    }, this.app.onError)
  }

  ngOnInit(): void {

  }

}
