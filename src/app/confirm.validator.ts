// import {FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
// interface ValidatorFn {
//   (password: AbstractControl, matchingControlName: AbstractControl): ValidationErrors | null;
// }
//
// export function ConfirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
//   return (controlName: AbstractControl, matchingControlName:AbstractControl): ValidationErrors | null => {
//
//     const control = formGroup.controls[controlName];
//
//     const matchingControl = formGroup.controls[matchingControlName];
//
//     if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
//
//       return;
//
//     }
//
//     if (control.value !== matchingControl.value) {
//
//       matchingControl.setErrors({ confirmedValidator: true });
//
//     } else {
//
//       matchingControl.setErrors(null);
//
//     }
//
//   }
// }
//



// function passwordValidator(password: AbstractControl): { [key: string]: boolean } | null {
//
//   if (password.value !== undefined && (isNaN(password.value) || control.value < 18 || control.value > 45)) {
//     return { 'ageRange': true };
//   }
//   return null;
// }
