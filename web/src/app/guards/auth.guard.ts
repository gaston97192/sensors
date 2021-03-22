import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    this.authService.validateToken().subscribe(
      (resp => true),
      (error) => {
        this.router.navigateByUrl(environment.endPoints.home)
        return false
      }
    )

    return true;
  }
  
}
