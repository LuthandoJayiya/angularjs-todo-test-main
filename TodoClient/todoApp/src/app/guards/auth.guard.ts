import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token =  sessionStorage.getItem('token');
    if (token) {
      console.log('Token found:', token);
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
