import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileData: any;
  private profileSub = new Subject<any>();
  getProfileUpdateListener(){
    return this.profileSub.asObservable();
  }
  constructor(private  http: HttpClient) {
    if(localStorage.getItem('userData')){
      this.profileData = JSON.parse(localStorage.getItem('userData'));
      this.profileSub.next(this.profileData);
    }
  }
  getProfileData(data){
    // console.log('service', data);
    this.profileSub.next(data);
  }
  getUpdatedProfileData(){
    return this.profileData;
  }
}
