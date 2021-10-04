import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router ,  private  profileService: ProfileService) { }
  //
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    this.profileService.getProfileData(JSON.parse(localStorage.getItem('userData')));
  }
}
