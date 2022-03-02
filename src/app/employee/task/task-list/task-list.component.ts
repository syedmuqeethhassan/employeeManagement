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
  tempRows: any;
  searchText:any
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
        if(this.userLogged.username=='superuser'){
          this.rows=this.taskUsers
          this.tempRows=this.taskUsers
          
          this.rows.forEach(element => {if(element.updateddate==null){
            element.updateddate='-'
          }
            
          });
        }
        else{
        this.rows=this.taskUsers.filter(x=>(x.createdby==this.userLogged.name || x.assignto==this.userLogged.name))
        this.tempRows=this.rows
        }
      },
      error => {
        console.log('get task unsuccessful-Error', error);
        
      }
    );
  }
 
  editTask(row){
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
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.value) {
          this.apicallsservice.deleteTask(row_id).subscribe((data:any) => {
            console.log('deleted task ' )
            Swal.fire(data.message
            )
            this.gettaskdata()
          },
          (error:any)=>{
            Swal.fire(error.message)
          }
          
          
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
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
  async updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    console.log(event.target.value, 'this is event value')
    if (event.target.value) {
      if (this.rows[rowIndex][cell] != '') {
        this.rows[rowIndex][cell] = event.target.value;
        this.rows[rowIndex].id=this.rows[rowIndex]._id
        this.rows = [...this.rows];
        this.apicallsservice.updateTaskData( this.rows[rowIndex],this.rows[rowIndex]._id).subscribe(
          (data:any) => {
            console.log('Update task is successful ');
            this.gettaskdata()
            Swal.fire(data.message)
           
          },
          (error:any) => {
            console.log('update task is not successful-error', error);
            Swal.fire(error.message)
          }
        );
      }
    }
}

search(searchText?: any): any {
  this.rows = this.tempRows;
  if (!searchText) {
    this.rows = this.tempRows;
  }
  
  const finalArr = this.rows.filter((val) => {
    return val.taskname.toLocaleLowerCase().includes(searchText) ||
    val.assignto.toString().includes(searchText)||
    val.createdby?.toString().includes(searchText)
  });
  this.rows = finalArr;
}
}
