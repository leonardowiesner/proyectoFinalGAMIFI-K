import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //TODO: Implementar la condición para poder entrar dentro de la MainPage

      if(this.authService.user.email != '' && this.authService.user.password != ''){
        console.log('Lo Pasa');
        
        return true;
      }else{
        console.log('No lo pasa');
        
        this.router.navigate(['/login']);
        return false;
      }

     
  }

}
