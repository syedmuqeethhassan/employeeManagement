import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';
import { from, Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rows:any
  columns = [{ prop: 'userName' ,}, { prop: 'password' }, { prop: 'phoneNumber' },{ prop: 'name' },{ prop: 'gender' },{ prop: 'id' },{ prop: 'age' },{ prop: 'rolesArray' }];
  addEmployeeModalDisplay:boolean=false
  jsonServerData:any
  data:any
  id:any
  name:any
  age:any
  gender:any
  rolesArray:any
  username:any
  phonenumber:any
  allDataSubject = new Subject<any>();
  showViewEmployeeModal=false
  closeViewEmployeeModal=false
  showEditEmployeeModal=false
  editEmployeeFormdata:any
  Manager:boolean=false
  Developer:boolean=false
  Admin:boolean=false
  adminData:any
  managerData:any
  developerData:any

  constructor(public apicallservice:ApiCallsService) { }

  

  ngOnInit(): void {
    this.apicallservice.getAllData()
    this.apicallservice.allDatatosubject()
    this.apicallservice.allDataAsObservable()
    this.apicallservice.allDataSubject.subscribe((receivedData)=>{
      console.log(receivedData)
      let userLoggedData = JSON.parse(sessionStorage.getItem('userLogged'))
      if(userLoggedData.rolesArray.includes('Admin')){
        this.data=receivedData.data
        console.log('admin')
        this.Admin=true
        this.rows=this.data
        console.log(this.rows)
        console.log(this.data)
        

      }
      else if(userLoggedData.rolesArray.includes('Manager')){
        const managerData = receivedData.data.filter(x => (x.rolesArray.includes('Developer') || x.rolesArray.includes('Manager')) && !x.rolesArray.includes('Admin'))
        
        console.log("is this working", managerData)
          this.data=managerData
          this.rows=this.data
          console.log(' is this it')
      }
        
      else if(userLoggedData.rolesArray.includes('Developer')){
          this.data=[userLoggedData]
          this.rows=this.data
          console.log('only developer')
        }
      
    }
    )
    this.checkDesignation()
   }
   loadData(){
    this.apicallservice.getAllData()
    this.apicallservice.allDatatosubject()
    this.apicallservice.allDataAsObservable()
    this.apicallservice.allDataSubject.subscribe((receivedData)=>{
      this.data=receivedData
    }
    )
   }
  addEmployeeModal(){
    this.addEmployeeModalDisplay=true
    console.log("add employee modal should woprk")
  }
  closeAddEmployeeModalDisplay(){
    this.addEmployeeModalDisplay=false
  }
  closeViewEmployeeModalDisplay(){
    this.showViewEmployeeModal=false
  }

  deleteEmployee(id){
    let employeeid=id
    this.alertConfirmation(employeeid)
    this.loadData()
    
   
    
  }
  alertConfirmation(employeeid){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        this.apicallservice.deletePost(employeeid)
        Swal.fire(
          'Removed!',
          'Employee removed successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Employee still in our database.)',
          'error'
        )
      }
    })
  }  

  viewEmployee(employeeobject){
    
    let employeedata=employeeobject
    // this.apicallservice.viewEmployee(employeeid)
    this.showViewEmployeeModal=true
    this.id=employeeobject.id
    this.name=employeeobject.name
    this.age=employeeobject.age    
    this.gender=employeeobject.gender 
    this.rolesArray=employeeobject.rolesArray 
    this.username=employeeobject.userName
    this.phonenumber=employeeobject.phoneNumber
    // this.username=employeeobject.username
  }
  editEmployee(employeeobject){
    this.editEmployeeFormdata=employeeobject
    console.log(this.editEmployeeFormdata)
    this.showEditEmployeeModal=true
    this.apicallservice.getAllData()
    this.apicallservice.allDatatosubject()
    this.apicallservice.allDataAsObservable()
    this.apicallservice.allDataSubject.subscribe((receivedData)=>{
      this.data=receivedData
    }
    )
    // this.editemployeecomponent.assigndata(employeeobject)
    // // this.username=employeeobject.username
  }
  closeEditEmployeeModalDisplay(){
    this.showEditEmployeeModal=false
   
  }
  checkDesignation(){
    if(this.data?.data?.rolesArray.includes('Admin')){
      this.Admin=true
    }
    else{
      if(this.data?.data?.rolesArray.includes('Manager') && !(this.data.data.rolesArray.includes('Admin'))){
        this.Manager=true
      }
      else{
        this.Developer=true
      }
    }

  }
  
}
