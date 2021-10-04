import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormTest: FormGroup;
  countries: any[] = [];
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  constructor(private http: HttpClient) {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl(' ' , [Validators.required]),
      country: new FormControl(' ' , [Validators.required]),
      checkbox1: new FormControl(false, [Validators.required]),
    });
    // @ts-ignore
    // this.registrationFormTest = [...this.registrationForm];
    // this.registrationFormTest = Object.assign({},  this.registrationForm);
    // console.log('registrationFormTest ', this.registrationFormTest.value);
    this.http.get('assets/country.json').subscribe((data: any) => {
      this.countries = data;
    });
  }

  ngOnInit(): void {
  }

  submitRegistration(){
    if (this.registrationForm.valid && (this.registrationForm.value.password === this.registrationForm.value.confirmPassword)){
      // if(this.registrationForm.value.country === ' '){
      //   this.registrationForm.patchValue({country: null}) ;
      // }
      // if(this.registrationForm.value.checkbox1 === false){
      //   this.registrationForm.patchValue({checkbox1: null}) ;
      // }
      // if(this.registrationForm.value.gender === ' '){
      //   this.registrationForm.patchValue({gender: null}) ;
      // }
      console.log(this.registrationForm.value);
      // Object.keys(this.registrationForm.controls).forEach(field => {
      //   const control = this.registrationForm.get(field);
      //   control.markAsUntouched({ onlySelf: true });
      // });
       this.registrationForm.reset();
      // Object.keys(this.registrationForm.controls).forEach(field => {
      //   const control = this.registrationForm.get(field).value;
      //   if(control === null){
      //     this.registrationForm.get(field).clearValidators() ;
      //     this.registrationForm.get(field).updateValueAndValidity();
      //   }
      // });
      // return;

      //  if(this.registrationForm.get('country').value === null){
      //   this.registrationForm.get('country').clearValidators() ;
      //   this.registrationForm.get('country').updateValueAndValidity();
      // }

       // this.registrationForm = Object.assign({}, this.registrationFormTest);
      //  console.log('registrationForm ', this.registrationForm.value);

      // this.registrationForm = this.registrationFormTest;
      //
      // this.registrationForm.markAsPristine();
      // Object.keys(this.registrationForm.controls).forEach(field => {
      //   const control = this.registrationForm.get(field);
      //   control.clearValidators();
      // });

      // this.registrationForm.patchValue({checkbox1: false, gender: ' ', country: ' '}) ;
      // this.registrationForm.setValue({email: '', password: '', confirmPassword:  '', firstName: '', lastName: '' , checkbox1: false, gender: ' ', country: ' '});
    }else{
      // Object.keys(this.registrationForm.controls).forEach(field => {
      //   const control = this.registrationForm.get(field);
      //   control.markAsTouched({ onlySelf: true });
      // });
      if(this.registrationForm.value.country === ' '){
        this.registrationForm.patchValue({country: null}) ;
      }
      if(this.registrationForm.value.checkbox1 === false){
        this.registrationForm.patchValue({checkbox1: null}) ;
      }
      if(this.registrationForm.value.gender === ' '){
        this.registrationForm.patchValue({gender: null}) ;
      }
      // this.registrationForm.patchValue({checkbox1: null, gender: null}) ;
    }
  }
}
