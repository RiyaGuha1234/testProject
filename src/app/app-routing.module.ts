import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormTestComponent} from './form-test/form-test.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LogInGuardService} from './services/log-in-guard.service';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {UserMgmtComponent} from './user-mgmt/user-mgmt.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'testForm', component: FormTestComponent },
  { path: 'registration', canActivate: [LogInGuardService], component: RegistrationComponent },
  // { path: 'registration', component: RegistrationComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'login', canActivate: [LogInGuardService], component: LoginComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'editProfile', canActivate: [AuthGuardService], component: ProfileEditComponent },
  // { path: 'userMgmt', canActivate: [AuthGuardService], component: UserMgmtComponent },
  { path: 'userMgmt', component: UserMgmtComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
