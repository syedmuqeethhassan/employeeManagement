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
    console.log(userLoggedData)
    console.log(userLoggedData._id)
    this.oldPassword=this.changePasswordForm.get('currentPassword').value
    this.newPassword=this.changePasswordForm.get('newPassword').value
    this.confirmPassword=this.changePasswordForm.get('confirmPassword').value
    this.id=userLoggedData._id
   if(this.newPassword==this.confirmPassword){
     this.changePassword(this.id)
   }
  } 
  changePassword(id){
    this.apicallservice.changePassword(this.id,this.changePasswordForm.value).subscribe(
      data => {
        console.log('change password is successful ', data);
        Swal.fire(data)
        this.changePasswordForm.reset()
      },
      error => {
        console.log('Error', error);
        Swal.fire(error)
      }
    )
    this.router.navigate(['/employee/dashboard']);
    }
  
}
