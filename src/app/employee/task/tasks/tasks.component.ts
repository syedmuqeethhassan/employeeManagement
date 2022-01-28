import { Component, Input, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
rows:any;
showForm:boolean
@Input() rowfromchild:any
  formEdit: any;

  constructor() { }

  ngOnInit(): void {
    console.log('task component works')
  }
  
  onRowReceive(row){
    this.rows=row;
    console.log('row receievd in tasks ie parent',row)
  
    }
  
  formStatus(event){
      console.log(event,"parent componenet received showform variable")
      this.showForm=!this.showForm
    }

  formAction(event){
    this.formEdit=event
  }
  // formClose(event){
  //     this.showForm=event
  //     console.log('close FOrm reached parent',event)
  //   }

}
