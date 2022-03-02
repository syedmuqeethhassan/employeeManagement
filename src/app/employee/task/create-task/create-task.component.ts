import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/api-calls.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  date: Date;
  datepipe: any;
  taskID:number
  @Input() formEdit:boolean=false
  @Input() id
  @Output() formEvent = new EventEmitter<boolean>();

  
  @Input() receivedrow;
  formPurpose:String
  formAction: string="submit"
  closeForm: boolean;
  showForm: boolean;
  user:any
  name: any;
  userDropdown: any;
  taskData:any
  constructor(public dashboardcomponent:DashboardComponent,public apicallsservice:ApiCallsService,private formbuilder:FormBuilder,public zone:NgZone) {
    this.createForm()
   }
  users:any
  userDropdownList=[]
  ngOnInit(): void {
  console.log(this.receivedrow,'this is the receivedrow')
  this.getUser()
  this.createForm()
  this.initData()
}
createForm(){
  this.taskForm = this.formbuilder.group({
    taskname: ['', [Validators.required]],
    taskstatus:  ['', [Validators.required]],
    assignto:['',[Validators.required]],
    taskdescription: ['', [Validators.required]],
    createdby:[],
    date:[],
    updateddate:[''],
  })
  this.formPurpose="Create Task"
  this.formAction="submit"
}
getUser(){
  let fetchedData = sessionStorage.getItem('userLogged')
  this.user = JSON.parse(atob(fetchedData));
  this.name=this.user.name
}

initData(){
  this.apicallsservice.getUsers().subscribe(
    data => {
      console.log('all employees in create task component ', data);
      this.users = data
      this.userDropdownList=this.users
      this.userDropdownList.splice(this.userDropdownList.indexOf('super user'), 1);
      this.date = new Date();
      // this.taskForm.controls.createdby.setValue(this.user.name)
      this.taskForm.value
      console.log(this.receivedrow)
      if (this.formEdit == true) {
        this.taskID = this.receivedrow._id;
        this.formPurpose = "Edit Task"
        this.formAction = "Update"
        this.taskForm.patchValue(
          {
            taskname: this.receivedrow?.taskname,
            taskstatus: this.receivedrow?.taskstatus,
            assignto: this.receivedrow?.assignto,
            taskdescription: this.receivedrow?.taskdescription,
            date:this.receivedrow.date,
            createdby:this.receivedrow.createdby
          }
        )
      }
      else {
        this.taskForm.reset()
      }
    },
    error => {
      console.log('update task is not successful-error', error);
    }
  );



}
closeTaskForm(){
  this.formEdit=false
  this.formPurpose="Create Task"
  this.formAction="submit"
  this.receivedrow={}
  this.taskForm.reset()
  console.log("close forms")
  this.showForm=false
  this.formEvent.emit(this.showForm)
}
ngOnChanges(changes: SimpleChanges) {
  console.log('OnChanges');
  console.log(JSON.stringify(changes)); 
}

deleteTask(){
  this.apicallsservice.deleteTask(this.taskID).subscribe(
    (data:any) => {
      console.log('delete task is successful ', data);
      Swal.fire(data.message)
      this.taskForm.reset()
    },
    (error:any) => {
      console.log('task not deleted', error);
      Swal.fire(error.message)
    }
  );
}

async onSubmit(){
  if(this.formAction=="Update"){
    // this.taskForm.controls.createdby.setValue(this.user.name)
    this.taskForm.controls.updateddate.setValue(new Date)
  this.apicallsservice.updateTaskData(this.taskForm.value,this.receivedrow._id).subscribe(
    (data: any) => {
      Swal.fire(data.message)
      this.taskForm.reset()
      this.initData()
    },
    error => {
      console.log('create task', error);
      Swal.fire(error.message)
    }
  );
  this.closeTaskForm()
}
  else{
    this.taskForm.controls.createdby.setValue(this.user.name)
    this.taskForm.controls.date.setValue(new Date)
    this.taskForm.value
    this.apicallsservice.postTask(this.taskForm.value).subscribe(
      (data:any) => {
        console.log('create task is successful ', data);
        Swal.fire(data.message)
        this.taskForm.reset()
      },
      error => {
        console.log('create task', error);
        Swal.fire(error.message)
      }
    );
  }
}
}