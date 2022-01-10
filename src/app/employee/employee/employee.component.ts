import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
data:any
  addEmployeeModalDisplay: boolean;
  constructor(public apicallsservice:ApiCallsService) { }

  ngOnInit(): void {
    this.apicallsservice.getAllData()
    // this.apicallsservice.allDatatosubject()
    // this.apicallsservice.allDataAsObservable()
    this.apicallsservice.allDataSubject.subscribe((receivedData)=>{
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

}
