import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/Autentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAutenticationGuard implements CanActivate {

  statusLogin: boolean


  constructor(private autentication: LoginService) { }

  canActivate():boolean{

    return true;
  }
}