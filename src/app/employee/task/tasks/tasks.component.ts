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
    
  }
  
  onRowReceive(row){
    this.rows=row;
    }
  
  formStatus(event){
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
