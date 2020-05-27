import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Globleservices } from '../services/globleservices';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class Authadmin implements CanActivate {
  constructor(private service : Globleservices, private router: Router,private route: ActivatedRoute){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.service.isadminlogin == false){
        this.router.navigate(['libadmin']);
        return this.service.isadminlogin;
      }
      return this.service.isadminlogin;
  }
}
