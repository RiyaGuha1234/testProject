import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any[] = [];
  userProfile: any = null;
  user: any = null;


  constructor(private  http: HttpClient,private router: Router , private  authService: AuthService , private profileService: ProfileService) {
    this.http.get('assets/profileData.json').subscribe((data: any) => {
      this.profileData = data;
      this.user  = JSON.parse(localStorage.getItem('user'));
      for(let i = 0; i < this.profileData.length ; i++){
        if(this.user === this.profileData[i].email){
          this.userProfile = this.profileData[i];
          localStorage.setItem('userData', JSON.stringify( this.userProfile));
          this.profileService.getProfileData(this.userProfile);
          break;
        }
      }
    });


  }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }

}
