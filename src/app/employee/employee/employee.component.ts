import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
data:any
  constructor(public apicallsservice:ApiCallsService) { }

  ngOnInit(): void {
    this.apicallsservice.getAllData()
    this.apicallsservice.allDatatosubject()
    this.apicallsservice.allDataAsObservable()
    this.apicallsservice.allDataSubject.subscribe((receivedData)=>{
      this.data=receivedData
    }
    )
  }

}
