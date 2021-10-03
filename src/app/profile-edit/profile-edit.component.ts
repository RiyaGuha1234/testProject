import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {J} from '@angular/cdk/keycodes';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  userData: any;
  user: any;
  profileData: any[] = [];
  countries: any[] = [];
  showError = false;
  editProfileForm: FormGroup;
  constructor(private  http: HttpClient , private  authService: AuthService) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.http.get('assets/country.json').subscribe((data: any) => {
      this.countries = data;
    });
    this.editProfileForm = new FormGroup({
      email: new FormControl(this.userData.email),
      firstName: new FormControl(this.userData.firstName),
      lastName: new FormControl(this.userData.lastName),
      gender: new FormControl(this.userData.gender),
      country: new FormControl(this.userData.country)
    });
  }

  ngOnInit(): void {
  }
  Update(){
    if(this.editProfileForm.value === null){
      this.showError = true;
      return;
    }else{
      if(this.editProfileForm.dirty){
        this.showError = false;
        console.log(this.editProfileForm.value);
        this.editProfileForm.reset();
      }
    }
  }
  logout(){
    this.authService.logout();
  }

}
