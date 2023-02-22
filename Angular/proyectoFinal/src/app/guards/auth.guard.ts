import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly student: StudentService,
    private readonly teacher: TeacherService,
  ) { 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.student.token != '' || this.teacher.token != '') {
        return true;
      }else{
        console.log('No lo pasa');
        
        this.router.navigate(['/login']);
        return false;
      }

     
  }

}
