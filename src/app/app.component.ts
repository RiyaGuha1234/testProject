import { Component , OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ProfileService} from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestProject';
  isAuthenticated: boolean;
  constructor(private authService: AuthService , private profileService: ProfileService) {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void{
    if(localStorage.getItem('user')){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    this.profileService.getProfileUpdateListener().subscribe((response) => {
      if(response){
        console.log('app');
        console.log(response);
        this.isAuthenticated = true;
      }
      else{
        this.isAuthenticated = false;
      }
    });
  }
}
