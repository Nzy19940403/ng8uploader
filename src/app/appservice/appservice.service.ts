import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Route1Component } from '../pageModule/route1/route1.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Route1Permission{
  CanDeactivate(component:any):Observable<boolean> | Promise<boolean> |boolean{
   
    return component.getState().pipe(
      map(
        (res:number)=>{
          console.log(res)
          if(res%2){
            return true
          }else{
            return false
          }
          
        }
      )
    )
  
  }
} 

@Injectable()
export class AppserviceService implements CanDeactivate<Route1Component>{
  canDeactivate(
    component:Route1Component,
    currentRoute:ActivatedRouteSnapshot,
    currentState:RouterStateSnapshot,
    nextState:RouterStateSnapshot
  ):Observable<boolean> | Promise<boolean> |boolean{    
    
    return this.permission.CanDeactivate(component)
  
  }

  constructor(
    private permission:Route1Permission
  ) { }

}
