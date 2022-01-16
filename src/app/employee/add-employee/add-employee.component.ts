import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup,FormArray,FormControl}  from '@angular/forms';
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
  
  role: Array<any> = [
    { name: 'admin', value: 'Admin' },
    { name: 'manager', value: 'Manager' },
    { name: 'developer', value: 'Developer' }
    
  ];
  
  addEmployeeForm: FormGroup;
  addEmployeeFormData:any
  username:string
  password:string
  url='http://localhost:3000/employees'
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public apicallservice:ApiCallsService,public dashboardcomponent:DashboardComponent) {
    this.createForm()
   }
  ngOnInit(): void {
  }
  createForm(){
    this.addEmployeeForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
      phonenumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender:['',[Validators.required]],
      id: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      age: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      role: this.formbuilder.array([])
    })
  }
async onSubmit (){
  this.http.get<any>(this.url).subscribe(async result=>{
      const user=result.find((a:any)=>{
        return a.username === this.addEmployeeForm.value.username
      })
      if(user){
        Swal.fire("username already exists") 
      }
      else{
        this.alertConfirmationAdd(this.addEmployeeForm.value)
        
      }
    })
    
}
onCheckboxChange(e) {
  const role: FormArray = this.addEmployeeForm.get('role') as FormArray;

  if (e.target.checked) {
    role.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    role.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        role.removeAt(i);
        return;
      }
      i++;
    });
  }
}



alertConfirmationAdd(addEmployeeForm){
  Swal.fire({
    title: 'Are you sure?',
    text: 'This process is irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think'
  }).then(async(result) => {
    
       
    if (result.value) {
      console.log("ADD EMPLOYEE OWRKING")
        this.addEmployeeFormData = {...this.addEmployeeForm.value}
        console.log(this.addEmployeeFormData)
        await this.apicallservice.postAddEmployeeFormData(this.addEmployeeFormData)
        this.dashboardcomponent.loadData()
        this.dashboardcomponent.addEmployeeModalDisplay=false
      Swal.fire(
        'done!',
        'Employee added successfully.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Employee not added.',
        
      )
    }
  })
}  
}
