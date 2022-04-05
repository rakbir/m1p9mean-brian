import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeRestosComponent } from './components/liste-restos/liste-restos.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:"",
    component:ListeRestosComponent
  },
  {
    path:"login",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
