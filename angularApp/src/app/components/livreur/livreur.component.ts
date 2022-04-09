import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {
  type="livreur";
  utilisateur:any;
  connected=false;
  message={
    content:"",
    type:"erreur" //info , erreur, succès
  }

  constructor(private app:AppComponent, private router:Router) { }

  ngOnInit(): void {
    this.app.getUser(this.type)
    .subscribe((reponse:any)=>{
      switch(reponse.status){
        case 0:
          this.message.content="Veuillez-vous connecter s'il vous plaît";
          this.router.navigateByUrl('livreur/login')
          break;
        case 1:
          this.utilisateur=reponse.data;
          this.connected=true;
          break;
      }
    }, this.app.onError)
  }

  removeUtilisateur(){
    this.utilisateur="",
    this.connected=false;
  }

}
