import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Globleservices } from '../services/globleservices';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class Authmember implements CanActivate {
  constructor(private service : Globleservices, private router: Router,private route: ActivatedRoute){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("inside member",this.service.ismemberlogin)
      if(this.service.ismemberlogin == false){
        this.router.navigate(['login']);
        return this.service.ismemberlogin;
      }
      return this.service.ismemberlogin;
      // return true;
  }
}
