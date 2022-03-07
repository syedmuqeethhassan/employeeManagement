import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/api-calls.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createleave',
  templateUrl: './createleave.component.html',
  styleUrls: ['./createleave.component.css']
})
export class CreateleaveComponent implements OnInit {
  user: any;
  name: any;
  userDropdownList: any;
  users: any;
  todayDate=new Date()
  limitDate:any
maxDate:any
  constructor(public formbuilder:FormBuilder,public apicallsservice:ApiCallsService) { }
  createLeavesForm: FormGroup;
  ngOnInit(): void {
  this.limitDate=this.getDate(this.todayDate)
    this.apicallsservice.getUsers().subscribe(
      data => {
        this.userDropdownList=data
        console.log(this.userDropdownList)
        this.userDropdownList.splice(this.userDropdownList.indexOf('super user'), 1);
        this.users=this.userDropdownList
        console.log(this.users)
      },err=>{
        console.log('errorr')
      })
    this.createForm()
    // this.createLeavesForm.controls.startDate.setValue(new Date())
    this.getUser()
    // this.maximumDate()
    this.createLeavesForm.valueChanges.subscribe(val => {
      console.log(val.startDate,'val changes');
      this.maxDate=val.startDate
    })
  }
  
  createForm(){
    this.createLeavesForm = this.formbuilder.group({
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      reason:['',Validators.required],
      manager:[''],
      createdBy:[''],
      createdDate:[''],
      updatedDate:[''],
      approved:['']

    })
  }
  getDate(todayDate){
    var day:any=this.todayDate.getDate();
    if(day<10){
      day='0'+day
    }
    var month:any=this.todayDate.getMonth()+1;
    if(month<10){
      month='0'+month
    }
    var year=this.todayDate.getFullYear();
    let x=year+'-'+month+'-'+day
    return x
  }
  getUser(){
    let fetchedData = sessionStorage.getItem('userLogged')
    this.user = JSON.parse(atob(fetchedData));
    this.name=this.user.name
  }
  // maximumDate(){
  //  let x=this.createLeavesForm.get('startDate').value
  //  this.maxDate=this.getDate(x)
  //  console.log(this,this.maxDate)
  // }
onSubmit(){
  this.createLeavesForm.controls.createdBy.setValue(this.name)

  this.apicallsservice.addLeave(this.createLeavesForm.value).subscribe((data:any)=>{
    Swal.fire(data.message)
  },(err:any)=>{
    console.log(err)
  })
}
}
