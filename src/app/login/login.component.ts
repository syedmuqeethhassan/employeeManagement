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
  userName:string
  password:string
  userLogged:string='userLogged'
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public dashboardcomponent:DashboardComponent) {

    this.loginForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
    })


   }

  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.http.get<any>('http://localhost:3000/employees').subscribe(result=>{
      const user=result.find((a:any)=>{
        return a.userName === this.loginForm.value.userName && a.password === this.loginForm.value.password
      })
      if(user){
        // this.dashboardcomponent.checkDesignation()
        sessionStorage.setItem(this.userLogged, JSON.stringify(user));
        Swal.fire("logged in")
        this.router.navigate(['/employee/dashboard']);
        this.loginForm.reset()
      }
      else{
       Swal.fire("incorrect credentials")
      }
    })
  }
  
}
