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
  
  roles: Array<any> = [
    { name: 'admin', value: 'Admin' },
    { name: 'manager', value: 'Manager' },
    { name: 'developer', value: 'Developer' }
    
  ];
  
  addEmployeeForm: FormGroup;
  addEmployeeFormData:any
  userName:string
  password:string
  url='http://localhost:3000/employees'
  constructor(public formbuilder:FormBuilder, private router: Router,public http:HttpClient,public apicallservice:ApiCallsService,public dashboardcomponent:DashboardComponent) {
    this.createForm()
   }
  ngOnInit(): void {
  }
  createForm(){
    this.addEmployeeForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      password:  ['', [Validators.required]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9]*")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender:['',[Validators.required]],
      id: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      age: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1),Validators.pattern("[0-9]*")]],
      rolesArray: this.formbuilder.array([])
    })
  }
async onSubmit (){
  this.http.get<any>(this.url).subscribe(async result=>{
      const user=result.find((a:any)=>{
        return a.userName === this.addEmployeeForm.value.userName
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
  const rolesArray: FormArray = this.addEmployeeForm.get('rolesArray') as FormArray;

  if (e.target.checked) {
    rolesArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    rolesArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        rolesArray.removeAt(i);
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
    console.log("ADD EMPLOYEE OWRKING")
        this.addEmployeeFormData = {...this.addEmployeeForm.value}
        console.log(this.addEmployeeFormData)
        await this.apicallservice.postAddEmployeeFormData(this.addEmployeeFormData)
        this.dashboardcomponent.loadData()
        this.dashboardcomponent.addEmployeeModalDisplay=false
       
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
