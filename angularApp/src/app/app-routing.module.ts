import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ListeRestosComponent } from './components/liste-restos/liste-restos.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:"",
    component:ClientComponent,
    children:[
      {
       path:"",
       component:ListeRestosComponent 
      },
      {
        path:"restaurants",
        component:ListeRestosComponent
      },
      {
        path:"login",
        component:LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
