import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  contactForm: FormGroup;
  constructor() {
    // this.contactForm = new FormGroup({
    //   address: new FormControl(null , [Validators.required]),
    //   aaa: new FormControl(null , [Validators.required]),
    //   // mobile: new FormControl(null , [Validators.required])
    // });
    this.contactForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }


  addDetails(){
    if (this.contactForm.invalid){
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    console.log(this.contactForm.value);
  }

}
