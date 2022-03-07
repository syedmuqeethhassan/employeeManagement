import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';

@Component({
  selector: 'app-leavesdashboard',
  templateUrl: './leavesdashboard.component.html',
  styleUrls: ['./leavesdashboard.component.css']
})
export class LeavesdashboardComponent implements OnInit {
leavesApplied:any
  constructor(public apicallsservice:ApiCallsService) { }

  ngOnInit(): void {
this.apicallsservice.fetchLeaves().subscribe((data:any)=>{
this.leavesApplied=data.data
console.log(this.leavesApplied)
},(err:any)=>{
  console.log('err in fetching leaves')
})
  }
editLeave(id){
  console.log(id)
}
deleteLeave(id){
  console.log(id)
}
}
