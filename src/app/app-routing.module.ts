import { Route2authService } from './pageModule/route2/route2auth.service';
import { AppserviceService } from './appservice/appservice.service';
import { Route2Component } from './pageModule/route2/route2.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route1Component } from './pageModule/route1/route1.component';
import { Route3Component } from './pageModule/route3/route3.component';

const routes: Routes = [
  {
    path:'1',
    component:Route1Component,
    canDeactivate:[AppserviceService]
  },
  {
    path:'2',
    component:Route2Component,
    canActivate:[Route2authService]
  },
  {
    path:'3',
    component:Route3Component,
 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
