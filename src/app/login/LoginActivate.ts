import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {currentUser} from '../global';

@Injectable({
  providedIn: 'root',
})
export class LoginActivate implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return currentUser.isLoggedIn;
  }
}
