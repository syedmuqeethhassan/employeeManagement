import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SortType  } from '@swimlane/ngx-datatable'
import { ResizedEvent } from 'angular-resize-event';
import { ApiCallsService } from 'src/app/api-calls.service';
import Swal from 'sweetalert2';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [],
})
export class TaskListComponent implements OnInit {
  editing = {};
  SortType = SortType;
  columns=[{name:'taskname'},{name:'taskstatus'},{name:'assignto'},{name:'taskstartdate'}];
  rows:any
  @Input() showForm
  
  @Input() closeForm;
  @Output() dataEvent = new EventEmitter<String>();
  @Output() formEvent = new EventEmitter<boolean>();
  @Output() formPurpose = new EventEmitter<boolean>();
  editTaskModal: boolean;
  currentRow: any;
  userLogged: any;
  taskUsers: any;
  formEdit: boolean;
  width=0;
  height=0;
  constructor(public apicallsservice:ApiCallsService) { }

  ngOnInit(): void {
    let fetchedData = sessionStorage.getItem('userLogged')
  this.userLogged = JSON.parse(atob(fetchedData));
    this.gettaskdata()
    this.showForm=this.closeForm
  }
  gettaskdata(){
    this.apicallsservice.getAllTask().subscribe(
      data => {
        console.log('get task Request is successful ', data);
        this.taskUsers=data
        this.rows=this.taskUsers.filter(x=>(x.createdby==this.userLogged.name || x.assignto==this.userLogged.name))
        
      },
      error => {
        console.log('get task unsuccessful-Error', error);
        
      }
    );
  }
 
  editEmployee(row){
    console.log('edit employee row data',row)
    this.formEdit=true
    this.dataEvent.emit(row);
    this.showForm=!this.showForm
    this.formEvent.emit(this.showForm)
    this.formPurpose.emit(this.formEdit)
    console.log("data is emitted")
    
    
  }
  onResized(event: ResizedEvent) {
    this.width = event.newRect.width;
    this.height = event.newRect.height;
  }
  showFormFunction(){
    this.showForm=!this.showForm
    this.formEdit=false
    this.formEvent.emit(this.showForm)
    this.formPurpose.emit(this.formEdit)
    
  }
  async deleteTask(row_id){
    console.log("delete task",row_id)
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think'
      }).then(async (result) => {
        if (result.value) {
          await this.apicallsservice.deleteTask(row_id).subscribe(data => console.log('deleted task ', ))
          Swal.fire(
            'Removed!',
            'Task removed successfully.',
            'success'
          )
          this.gettaskdata()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'process aborted',
            'Task still in our database.)',
            'error'
          )
        }
      })
  }
  onActivate(event) {
    console.log('Activate Event', event);
  }
  displayCheck(row) {
    return row.name;
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    console.log(event.target.value, 'this is event value')
    if (event.target.value) {
      if (this.rows[rowIndex][cell] != '') {
        this.rows[rowIndex][cell] = event.target.value;
        console.log(this.rows[rowIndex], 'is this row object')
        console.log(this.rows[rowIndex].id)
        this.rows[rowIndex].id=this.rows[rowIndex]._id
        this.rows = [...this.rows];
        console.log(this.rows, 'this.rows')
        console.log("row index is",this.rows[rowIndex])
        console.log('UPDATED!', this.rows[rowIndex][cell]);
        this.apicallsservice.updateTaskData( this.rows[rowIndex]).subscribe(
          data => {
            console.log('Update task is successful ', data);
            Swal.fire('update successful')
          },
          error => {
            console.log('update task is not successful-error', error);
            Swal.fire('update unsuccessful')
          }
        );
      }
    }
}
}
