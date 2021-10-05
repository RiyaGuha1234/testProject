import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {J} from '@angular/cdk/keycodes';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs';
import {ProfileService} from '../services/profile.service';
import Swal from 'sweetalert2';


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
  files: any[] = [];
  imgURL: any[] = [];
  public imagePath;
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';

  editProfileForm: FormGroup;
  constructor(private  http: HttpClient , private  authService: AuthService , private profileService: ProfileService) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.http.get('assets/country.json').subscribe((data: any) => {
      this.countries = data;
    });
    this.editProfileForm = new FormGroup({
      email: new FormControl(this.userData.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      firstName: new FormControl(this.userData.firstName, [Validators.required]),
      lastName: new FormControl(this.userData.lastName, [Validators.required]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      country: new FormControl(this.userData.country, [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(window.location.href);
  }

  Update(){
    if(this.editProfileForm.value === null){
      this.showError = true;
      return;
    }else{
      if(this.editProfileForm.valid && this.editProfileForm.dirty){
        this.showError = false;
        console.log(this.editProfileForm.value);
        this.profileService.getProfileData(this.editProfileForm.value);
        // this.editProfileForm.reset();
      }
    }
  }
  logout(){
    this.authService.logout();
  }
  // fileBrowseHandler()
  // {
  //
  // }
  // onFileDropped($event){
  //   for(const item of $event){
  //       this.files.push(item);
  //   }
  // }
  // onFileChange(pFileList: File[]){
  //   this.files = Object.keys(pFileList).map(key => pFileList[key]);
  //   console.log(this.files);
  //   // this._snackBar.open("Successfully upload!", 'Close', {
  //   //   duration: 2000,
  //   // });
  // }
  onFileChange(event) {

    // for(let i = 0; i < event.target.files.length; i++){
    //   let reader = new FileReader();
    //   this.imagePath = this.files[i];
    //   reader.readAsDataURL(this.files[i]);
    //   console.log(reader);
    //   // tslint:disable-next-line:variable-name
    //   reader.onload = (_event) => {
    //     this.imgURL = reader.result;
    //
    //   }
    // this.files = event.target.files;
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
    this.imgURL = [];
    for(let i = 0 ; i < event.target.files.length ; i++ ){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e.target.result);
        this.imgURL.push(e.target.result);
      };
      reader.readAsDataURL(this.files[i]);
    }

  }
  deleteImage(index){
    // console.log(this.files);
    // console.log(this.files[index]);
    // this.files.splice(index,1);
    this.imgURL.splice(index,1);
    this.files.splice(index, 1);
    Swal.fire({
      // title: 'Success' ,
      text: 'Image deleted successfully',
      timer: 1000,
      showConfirmButton: false

    });
  }
}
