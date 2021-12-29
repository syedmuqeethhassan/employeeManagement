import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup}  from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiCallsService } from 'src/app/api-calls.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  roles=['admin','manager','developer']
  
  addEmployeeForm: FormGroup;
  addEmployeeFormData:any
  userName:string
  password:string
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public apicallservice:ApiCallsService,public dashboardcomponent:DashboardComponent) {

    this.addEmployeeForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender:['',[Validators.required]],
      id: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      age: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      role:['',[Validators.required]]
    })


   }

  ngOnInit(): void {
  }
onSubmit(){
  this.http.get<any>('http://localhost:3000/employees').subscribe(result=>{
      const user=result.find((a:any)=>{
        return a.userName === this.addEmployeeForm.value.userName
      })
      if(user){
        Swal.fire("username already exists")
        
      }
      else{
        this.alertConfirmationAdd(this.addEmployeeForm.value)
        this.dashboardcomponent.loadData()
        
      }
    })
    
}
alertConfirmationAdd(addEmployeeForm){
  Swal.fire({
    title: 'Are you sure?',
    text: 'This process is irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think'
  }).then((result) => {
    console.log("ADD EMPLOYEE OWRKING")
        this.addEmployeeFormData = {...this.addEmployeeForm.value}
        console.log(this.addEmployeeFormData)
        this.apicallservice.postAddEmployeeFormData(this.addEmployeeFormData)
        this.dashboardcomponent.addEmployeeModalDisplay=false
       this.router.navigateByUrl('/login')
    if (result.value) {
      Swal.fire(
        'done!',
        'Employee added successfully.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Employee not added.)',
        
      )
    }
  })
}  
}
