import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LivreurComponent } from './components/livreur/livreur.component';

@Injectable({
  providedIn: 'root'
})

export class LivreurGuard implements CanActivate {
  constructor(private livreur:LivreurComponent, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.livreur.connected){
      return true;
    }else{
      this.router.navigate(['/livreur/login']);
      return false;
    }    
  }  
}
