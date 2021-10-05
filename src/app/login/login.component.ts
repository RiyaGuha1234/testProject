import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: any[] = [];
  isLoggedIn = false;
  showLogOut =  false;
  // emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.com';
  constructor(private http: HttpClient , private router: Router , private  authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.http.get('assets/loginData.json').subscribe((data: any) => {
      this.loginData = data;
    });
  }

  ngOnInit(): void {
  }
  login(){
    if (this.loginForm.valid){
      for (let i = 0; i < this.loginData.length ; i++){
        if((this.loginForm.value.email === this.loginData[i].email) && (this.loginForm.value.password === this.loginData[i].password)){
          this.isLoggedIn = true;
          this.showLogOut = true;
          localStorage.setItem('user', JSON.stringify(this.loginForm.value.email));
          this.router.navigate(['/profile']);
        }
      }
      if(this.isLoggedIn === false){
        for (let i = 0; i < this.loginData.length ; i++){
          if(this.loginForm.value.email === this.loginData[i].email){
            if(this.loginForm.value.password !== this.loginData[i].password){
              Swal.fire({
                title: 'Error',
                html: 'Invalid Password!!',
                showConfirmButton: false,
                timer: 1500
              });
            }
            break;
          }
          else{
            Swal.fire({
              title: 'Error',
              html: 'Invalid Credentials!!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      }
    }else{
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


}
