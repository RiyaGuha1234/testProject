import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  profileData: any [] = [];
  constructor( private http: HttpClient, private  profileService: ProfileService) {
    this.profileData = this.profileService.getUpdatedProfileData();
  }
  ngOnInit(): void {
    this.profileService.getProfileUpdateListener().subscribe((response) => {
      this.profileData = response;
      console.log('left');
      console.log(this.profileData);
    });

  }

}
