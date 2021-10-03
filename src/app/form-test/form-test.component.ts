import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
// import {ConfirmPasswordValidator} from '../confirm.validator';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {
  testForm: FormGroup;
  stateForm: FormGroup;
  countries: any[] = [];
  departments: any[] = [];
  states: any[] = [];
  countryWiseState: any[] = [];
  newState: string;
  count = 0;
  isConfirmPasswordValid = true;
  showAddDepartment = false;
  showAddMoreDepartmentDiv = true;
  showStateError = false;
  constructor(private  http: HttpClient, private fb: FormBuilder) {
    // @ts-ignore
    this.testForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        dept: new FormControl(null, [Validators.required]),
    });
    this.stateForm = new FormGroup({
      newState: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      department: this.fb.array([], [Validators.required, Validators.maxLength(5)])
    });
    this.http.get('assets/country.json').subscribe((data: any) => {
      this.countries = data;
    });
    this.http.get('assets/department.json').subscribe((data: any) => {
      this.departments = data;
    });
  }
  ngOnInit(): void {
  }
  submitForm(){
    if (this.testForm.valid){
      console.log(this.testForm.value);
      this.testForm.reset();
    }else{
      Object.keys(this.testForm.controls).forEach(field => {
        const control = this.testForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  onCountrySelected() {
    this.http.get('assets/state.json').subscribe((data: any) => {
      this.states = data;
      this.countryWiseState = this.states.filter(x => x.country_name == this.testForm.value.country);
    });
  }

  stateAdd() {
    // console.log();
    if (this.stateForm.value.newState === null || this.stateForm.value.newState.length <= 0){
      this.showStateError = true;
    }
    else{
      const newStateData = { state_name: this.stateForm.value.newState, country_name : this.testForm.value.country};
      this.countryWiseState.push(newStateData);
      this.states.push(newStateData);
      this.stateForm.controls.newState.reset();
    }

  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }
  checkValid(){
    console.log('checkValid invoked');
    if (this.testForm.value.password === this.testForm.value.confirmPassword){
    // if (this.testForm.value.password === data){
      this.isConfirmPasswordValid = true;
    } else{
      this.isConfirmPasswordValid = false;
    }
  }

  departmentList(): FormArray {
    return this.stateForm.get('department') as FormArray;
  }

  newDepartment(): FormGroup {
    return this.fb.group({
      department: '',
    });

  }

  addDepartment() {
    this.count = this.count + 1;
    if (this.count <= 5){
      console.log(this.newDepartment());
      this.departmentList().push(this.newDepartment());
      this.showAddMoreDepartmentDiv = true;
    }
  }

  removeDepartment(i: number) {
    this.departmentList().removeAt(i);
    this.count = this.count - 1;
  }

  addInDepartmentList(){
    for (let i = 0 ; i < this.stateForm.value.department.length ;  i++ ){
      if(this.stateForm.value.department[i].length > 0){
        this.departments.push(this.stateForm.value.department[i]);
      }
    }
    this.showAddMoreDepartmentDiv = false;
    this.departmentList().clear();
    this.count = 0;

  }

}

