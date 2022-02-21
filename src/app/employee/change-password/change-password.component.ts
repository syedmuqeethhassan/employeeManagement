import { Component, OnInit } from '@angular/core';
import{Validators,FormGroup,FormControl, FormArray} from '@angular/forms';
import{FormBuilder} from '@angular/forms';
import{DashboardComponent} from '../dashboard/dashboard.component';
import{ApiCallsService} from '../../api-calls.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  changedPassword:any
  oldPassword:any
  newPassword:any
  confirmPassword:any
  currentPasswordFlag:any
  newPasswordFlag:any

  user:any
  id:any
  baseurl='http://localhost:3000/employees/'
  constructor(public formbuilder:FormBuilder,public apicallservice: ApiCallsService, private router: Router) { }

  ngOnInit(): void {
    this.createForm()
  }
   createForm(){
    this.changePasswordForm = this.formbuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword:  ['', [Validators.required]],
      confirmPassword:  ['', [Validators.required]],
     
    })
  }
  onSubmit(){
    let fetchedData = sessionStorage.getItem('userLogged')
    let userLoggedData = JSON.parse(atob(fetchedData));
    console.log(userLoggedData.id)
    this.oldPassword=this.changePasswordForm.get('currentPassword').value
    this.newPassword=this.changePasswordForm.get('newPassword').value
    this.confirmPassword=this.changePasswordForm.get('confirmPassword').value
    this.id=userLoggedData.id
    this.apicallservice.getLoggedData(userLoggedData._id).subscribe(
      data => {
        this.user=data
        if(this.oldPassword == this.user?.password) {
        if(this.newPassword == this.confirmPassword){
        this.changedPassword=this.confirmPassword
        this.changePassword()
        }
        else{
          console.log('not changed password')
          this.newPasswordFlag=1
          this.currentPasswordFlag=0
        }
    }
    else{
      this.currentPasswordFlag=1
      this.newPasswordFlag=0
    }
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  changePassword(){
    if( this.user.password){
    this.user.password=this.confirmPassword
    this.apicallservice.putEmployeeFormData(this.user,this.id).subscribe(
      data => {
        console.log('change password is successful ', data);
        Swal.fire('successful')
        this.changePasswordForm.reset()
      },
      error => {
        console.log('Error', error);
        Swal.fire('unsuccessful')
      }
    )
    this.router.navigate(['/employee/dashboard']);
    }
  }
}
