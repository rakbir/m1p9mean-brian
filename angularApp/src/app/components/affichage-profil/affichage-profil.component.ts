import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Optional, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { urls } from 'src/environments/environment';
import { ClientComponent } from '../client/client.component';
import { ResponsableComponent } from '../responsable/responsable.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-affichage-profil',
  templateUrl: './affichage-profil.component.html',
  styleUrls: ['./affichage-profil.component.css']
})
export class AffichageProfilComponent implements OnInit {
  loading=false;
  @Input() connected=false;
  @Input() utilisateur:any;

  constructor(private router:Router, private app:AppComponent, private http:HttpClient,
    @Optional() private restaurant:RestaurantComponent,
    @Optional() private client: ClientComponent,
    @Optional() private responsable: ResponsableComponent) { }

  deconnexion(){
    this.loading=true;
    this.http.get(urls.deconnexion, {withCredentials:true})
    .subscribe((reponse:any)=>{
        if(this.utilisateur.type=="client"){
          this.client.removeUser();
        }
        if(this.utilisateur.type=="restaurant"){
          this.restaurant.removeAndredirect();
        }
        if(this.utilisateur.type=="responsable"){
          this.responsable.removeAndredirect();
        }
        alert('Succès de la déconnexion');
        this.loading=false;
    },(err:any)=>{
      alert('Il y eu une erreur lors de la connexion au serveur');
      this.loading=false;
    })
  }
  
  ngOnInit(): void {
  }
}
