import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Route2Component } from './route2.component';
import { Observable, of } from 'rxjs';


export class route2permission {
  canActivate(
    route:ActivatedRouteSnapshot,
    http:HttpClient
  ):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
 
    return true
  }
}



@Injectable()
export class Route2authService implements CanActivate {
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
     ):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
  
      return this.permission.canActivate(route,this.http)
     }
  
  constructor(
    private permission :route2permission,
    private http:HttpClient
  ) { }
}
