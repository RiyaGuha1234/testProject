// import { Injectable } from '@angular/core';
// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import {state} from '@angular/animations';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class LogInGuardService  implements  CanActivate{
//   private route: ;
//
//   constructor(private  router: Router) {
//     canActivate(router : ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {
//       if(localStorage.getItem('user')){
//         return true;
//       }else {
//         return false;
//       }
//     }
// }
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class LogInGuardService implements CanActivate{

  constructor(private  authService: AuthService , private  router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if(localStorage.getItem('user')){
      this.router.navigate(['profile']);
      return false;
    }else {
      return true;
    }
  }
}
