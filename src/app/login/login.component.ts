import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl }  from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../employee/dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username:string
  password:string
  url='http://localhost:3500/users/login'
  userLogged:string='userLogged'
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public dashboardcomponent:DashboardComponent) {

    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
    })
   }
  ngOnInit(): void {
  }

  
  onSubmit(){
    console.log(this.loginForm.value)
    // this.apiCall().subscribe(data => console.log(data))
    let loginForm={...this.loginForm.value}
    this.http.post<any>(this.url,loginForm).subscribe(result=>{
      let user=result
      console.log(result)
      if(user){
        delete(user.password);
        let encodedStr = btoa(JSON.stringify(user));
        sessionStorage.setItem(this.userLogged, encodedStr);
        Swal.fire("logged in")
        if(user.role=="Developer"){
          console.log('user is developer only')
          this.router.navigate(['/employee/tasks']);
        }else{
        this.router.navigate(['/employee/dashboard']);
        this.loginForm.reset()
        }
      }
      else{
       Swal.fire("Incorrect Credentials")
      }
    })
  } 
}
