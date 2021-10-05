import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss']
})
export class UserMgmtComponent implements OnInit {
  userManagementData: any[] = [];
  isAllSelected = false;
  addCheckAll = false;
  listCheckAll = false;
  editCheckAll = false;
  constructor(private http: HttpClient) {
    this.http.get('assets/userMgmt.json').subscribe((data: any) => {
      this.userManagementData = data;
      // console.log(this.userManagementData);
    });
  }

  ngOnInit(): void {
    this.isAllSelected = false;
    this.addCheckAll = false;
    this.listCheckAll = false;
    this.editCheckAll = false;
  }
  allCheck() {
    if (this.isAllSelected === false) {
      this.isAllSelected = true;
      if (this.userManagementData.length > 0) {
        for (let i = 0; i < this.userManagementData.length; i++) {
          this.userManagementData[i].edit = true;
          this.userManagementData[i].add = true;
          this.userManagementData[i].list = true;
        }
      }
      this.editCheckAll = true;
      this.addCheckAll = true;
      this.listCheckAll = true;
    }
    else{
        this.isAllSelected = false;
        if(this.userManagementData.length > 0) {
        for (let i = 0; i < this.userManagementData.length; i++) {
          this.userManagementData[i].edit = false;
          this.userManagementData[i].add = false;
          this.userManagementData[i].list = false;
      }
        this.editCheckAll = false;
        this.addCheckAll = false;
        this.listCheckAll = false;
      }
    }
    // if(this.addCheckAll === true && this.editCheckAll === true  && this.listCheckAll === true){
    //   this.isAllSelected = true;
    // }

  }

  UpdateUserData(){
    console.log(this.userManagementData);
  }
  addCheckAllFunction(){
    if(this.addCheckAll === true){
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        this.userManagementData[i].add = true;
      }
      if(this.listCheckAll === true && this.editCheckAll === true){
        this.isAllSelected = true;
      }
    }
    else{
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        this.userManagementData[i].add = false;
      }
      this.isAllSelected = false;
    }
  }
  editCheckAllFunction(){
    if(this.editCheckAll === true){
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        this.userManagementData[i].edit = true;
      }
      if(this.listCheckAll === true && this.addCheckAll === true){
        this.isAllSelected = true;
      }
    }
    else{
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        this.userManagementData[i].edit = false;
      }
      this.isAllSelected = false;
    }


  }
  listCheckAllFunction(){
    if(this.listCheckAll === true){
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        this.userManagementData[i].list = true;
      }
      if(this.addCheckAll === true && this.editCheckAll === true){
        this.isAllSelected = true;
      }
    }
    else{
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        this.userManagementData[i].list = false;
      }
      this.isAllSelected = false;
    }
  }

  moduleAdd(data){
    if(data === false){
      this.isAllSelected = false;
      this.addCheckAll = false;
    }
    else{
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        if(this.userManagementData[i].add === false){
          this.addCheckAll = false;
          this.isAllSelected = false;
          break;
        }
        else{
          if(this.editCheckAll === true && this.listCheckAll === true){
            this.isAllSelected = true;
            this.addCheckAll = true;
          }
          else{
            this.addCheckAll = true;
          }
        }
      }
    }
  }
  moduleEdit(data){
    if(data === false){
      this.isAllSelected = false;
      this.editCheckAll = false;
    }
    else{
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        if(this.userManagementData[i].edit === false){
          this.editCheckAll = false;
          this.isAllSelected = false;
          break;
        }
        else{
          if(this.addCheckAll === true && this.listCheckAll === true){
            this.isAllSelected = true;
            this.editCheckAll = true;
          }
          else{
            this.editCheckAll = true;
          }
        }
      }
    }
  }
  moduleList(data){
    if(data === false){
      this.isAllSelected = false;
      this.listCheckAll = false;
    }
    else{
      for(let i = 0 ; i < this.userManagementData.length ; i++){
        if(this.userManagementData[i].list === false){
          this.listCheckAll = false;
          this.isAllSelected = false;
          break;
        }
        else{
          if(this.addCheckAll === true && this.editCheckAll === true){
            this.isAllSelected = true;
            this.listCheckAll = true;
          }
          else{
            this.listCheckAll = true;
          }
        }
      }
    }
  }

}
