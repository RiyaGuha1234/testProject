import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {J} from '@angular/cdk/keycodes';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs';
import {ProfileService} from '../services/profile.service';
import Swal from 'sweetalert2';
import { base64StringToBlob } from 'blob-util';
import {consoleTestResultHandler} from 'tslint/lib/test';



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
  filesNew: File = null;
  imgURL: any[] = [];
  public imagePath;
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  cardImageBase64: string;
  editProfileForm: FormGroup;
  imageSrc: any;
  base64FormData: FormData = null ;

  constructor(private  http: HttpClient, private  authService: AuthService, private profileService: ProfileService) {
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
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      base64Image: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
    // console.log(window.location.href);
  }

  Update() {
    if (this.editProfileForm.value === null) {
      this.showError = true;
      return;
    } else {
      if (this.editProfileForm.valid && this.editProfileForm.dirty) {
        this.showError = false;
        console.log(this.editProfileForm.value);
        this.profileService.getProfileData(this.editProfileForm.value);
        const formData = new FormData();
        formData.append('file', this.editProfileForm.get('base64Image').value);
        console.log(formData);
      }
    }
  }

  logout() {
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
    this.filesNew = event;
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
    this.imgURL = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e.target.result);
        this.imgURL.push(e.target.result);
        // this.files.push(event.target.files[i]);
        this.imageSrc = reader.result as string;
        this.editProfileForm.patchValue({
          // fileSource: reader.result
          fileSource: this.imgURL,
          // file: this.files
        });
        const formData = new FormData();

        // Store form name as "file" with file data
        // formData.append("file", this.filesNew);
        // formData.append("file", 'abcd');
        formData.append("file", e.target.result);
        const data = btoa(e.target.result);
        const contentType = 'image/png';
        formData.append("encoded_file", btoa(e.target.result));
        // formData.append("encoded_file", base64StringToBlob(data , contentType));
        // formData.append("encoded_file",data);
        formData.append("property_type", 'base64');
        formData.forEach(function(value, key) {
          // console.log(key);
          console.log(key + ': ' + value);

        });
        // const formData: FormData = new FormData();
        // for (let i = 0; i < this.files.length; i++) {
        // formData.append('fileArray', this.files[i], this.files[i].name);
        // formData.append('fileArray', this.files[i]);
        // }
        // formData.append('file', this.editProfileForm.value.fileSource);
        // formData.append('file_name', event.target.files);
        // console.log(event.target);
        // console.log(this.editProfileForm.value.fileSource[0]);
        // console.log(formData);
        // var form_data = new FormData();
        // form_data.append('file', file);
      };
      reader.readAsDataURL(this.files[i]);
    }
    //binary
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e.target.result);
        // this.imgURL.push(e.target.result);
        // this.files.push(event.target.files[i]);
        // this.imageSrc = reader.result as string;
        // this.editProfileForm.patchValue({
        //   // fileSource: reader.result
        //   fileSource: this.imgURL,
        //   // file: this.files
        // });
        const formData = new FormData();

        // Store form name as "file" with file data
        // formData.append("file", this.filesNew);
        // formData.append("file", 'abcd');
        formData.append("file", e.target.result);
        const data = btoa(e.target.result);
        const contentType = 'image/png';
        // formData.append("encoded_file", btoa(e.target.result));
        formData.append("encoded_file", base64StringToBlob(data , contentType));
        // formData.append("encoded_file",data);
        formData.append("property_type", 'binary');
        formData.forEach(function(value, key) {
          // console.log(key);
          console.log(key + ': ' + value);

        });
        // this.base64FormData.append("file", e.target.result);
        // const data = btoa(e.target.result);
        // const contentType = 'image/png';
        // this.base64FormData.append("encoded_file", btoa(e.target.result));
        // this.base64FormData.append("encoded_file", base64StringToBlob(data , contentType));
        // // formData.append("encoded_file",data);
        // this.base64FormData.append("property_type", 'binary');
        // this.base64FormData.forEach(function(value, key) {
        //   // console.log(key);
        //   console.log(key + ': ' + value);
        //
        // });

        // const formData: FormData = new FormData();
        // for (let i = 0; i < this.files.length; i++) {
        // formData.append('fileArray', this.files[i], this.files[i].name);
        // formData.append('fileArray', this.files[i]);
        // }
        // formData.append('file', this.editProfileForm.value.fileSource);
        // formData.append('file_name', event.target.files);
        // console.log(event.target);
        // console.log(this.editProfileForm.value.fileSource[0]);
        // console.log(formData);
        // var form_data = new FormData();
        // form_data.append('file', file);
      };
      reader.readAsDataURL(this.files[i]);
    }

    this.editProfileForm.patchValue({image: this.files});
  }

  deleteImage(index) {
    // console.log(this.files);
    // console.log(this.files[index]);
    // this.files.splice(index,1);
    this.imgURL.splice(index, 1);
    this.files.splice(index, 1);
    Swal.fire({
      // title: 'Success' ,
      text: 'Image deleted successfully',
      timer: 1000,
      showConfirmButton: false

    });
  }


  // handleInputChange(file) {
  //   const preview = file ;
  //   console.log(preview.src);
  //   const reader = new FileReader();
  //   reader.addEventListener('load', function () =>{
  //     // convert image file to base64 string
  //     preview.src = reader.result;
  //   }, false);
  // }

  // reader.onloadend = this._handleReaderLoaded.bind(event.target.files);


  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
  //   console.log(base64result);
  // }
  test(event) {
    // // for (let j = 0; j < files.length; j++) {
    //   const data = new FormData();
    //   // const fileItem = files[j]._file;
    //   console.log(files[0]._file);
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   let imageSrc1 = reader.result as string;
    //   console.log(imageSrc1);
    // };
    // this.filesNew = event.target.files[0];
    this.filesNew = event;
  }
  // testForm(){
  //   const formData = new FormData();
  //
  //   // Store form name as "file" with file data
  //   // formData.append("file", this.filesNew);
  //   // formData.append("file", 'abcd');
  //   formData.append("file", this.editProfileForm.value.fileSource);
  //   formData.append("property_type", 'binary');
  //   formData.forEach(function(value, key) {
  //     // console.log(key);
  //     console.log(key + ': ' + value);
  //
  //   });
  //   // console.log(formData.get('file'));
  // }
  // onFileChangeBinary(event){
  //   console.log('onFileChangeBinary');
  //   const contentType = 'image/png';
  //   const b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
  //
  //   const blob = base64StringToBlob(b64Data, contentType);
  //
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //
  //     };
  //     const formData = new FormData();
  //     formData.append('test', blob);
  //     formData.append("property_type", 'binary');
  //     formData.forEach(function(value, key) {
  //       // console.log(key);
  //       console.log(key + ': ' + value);
  //
  //     });
  //   }
  //
  // }




}
