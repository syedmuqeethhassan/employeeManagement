import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';
import { from, Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SortType, SelectionType  } from '@swimlane/ngx-datatable'
import{ColumnMode} from '@swimlane/ngx-datatable'
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
],

})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  SelectionType = SelectionType;
  SortType = SortType;
  ColumnMode = ColumnMode;
  loggedPerson:any
  rows:any
  select:any
  selected = [];
  editing = {};
  columns = [{ name: 'userName' }, { prop: 'password' }, { prop: 'phoneNumber' },{ prop: 'name' },{ prop: 'gender' },{ prop: 'id' },{ prop: 'age' },{ prop: 'role' }];
  addEmployeeModalDisplay:boolean=false
  jsonServerData:any
  data:any
  id:any
  name:any
  age:any
  gender:any
  role:any
  selectedIds=[]
  username:any
  phonenumber:any
  allDataSubject = new Subject<any>();
  changeDataSubject = new Subject<any>();
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
  editRow:any
  retrievedData:any
  developer:any
  users='users'
  logged:string='usersList'
  constructor(public apicallservice: ApiCallsService, private zone: NgZone) { }

  ngOnInit(): void {
    this.loadData()
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    if (selected != undefined) {
      this.select = selected
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      if (!selected.length) {
        this.select = null
      }
    }
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
        this.rows = [...this.rows];
        console.log(this.rows, 'this.rows')
        console.log('UPDATED!', this.rows[rowIndex][cell]);
        this.apicallservice.UpdateEmployeeData(this.rows[rowIndex].id, this.rows[rowIndex])
      }
    }
    else {
      Swal.fire("enter valid value")
    }
  }
  loadData() {
    this.apicallservice.getAllData().subscribe((receivedData) => {
      this.retrievedData=receivedData
      let allUsers=btoa(JSON.stringify(this.retrievedData));
      sessionStorage.setItem(this.users,allUsers)
      console.log(receivedData)
      let fetchedData = sessionStorage.getItem('userLogged')
      let userLoggedData = JSON.parse(atob(fetchedData));
      this.loggedPerson=userLoggedData
      console.log(userLoggedData,'this is userlogged data');
      if (userLoggedData.role?.includes('Admin')) {
        this.data = this.retrievedData
        console.log('admin')
        console.log(this.data.length)
        for (let i = 0; i < this.data.length; i++) {
          delete (this.data[i].password)
            if(this.data[i].id==this.loggedPerson.id){
              this.data.splice(i,1)
          
        }}
        this.Admin = true
        this.rows = this.data
        let encodedStr = btoa(JSON.stringify(this.rows));

        sessionStorage.setItem(this.logged, encodedStr);
        console.log(this.data)
      }
      else if (userLoggedData.role?.includes('Manager')) {
        const managerData = this.retrievedData?.filter(x => (x.role.includes('Developer') || x.role.includes('Manager')) && !x.role.includes('Admin'))
        console.log("is this working", managerData)
        this.data = managerData
        for (let i = 0; i < this.data?.length; i++) {
          delete (this.data[i].password)
          if(this.data[i].id==this.loggedPerson.id){
            this.data.splice(i,1)
          }
         
      }
        this.rows = this.data
        let encodedStr = btoa(JSON.stringify(this.rows));

        sessionStorage.setItem(this.logged, encodedStr);
        console.log(' is this it')
      
    }
      else if (userLoggedData.role?.includes('Developer')) {
        this.data = [userLoggedData]
        for (let i = 0; i < this.data.length; i++) {
          delete (this.data[i].password)
            if(this.data[i].id==this.loggedPerson.id){
              this.data.splice(i,1)
          }
        }
        this.rows = this.data
        let encodedStr = btoa(JSON.stringify(this.rows));

        sessionStorage.setItem(this.logged, encodedStr);
        this.developer=true
        console.log('only developer')
      }
    }
    )
    this.checkDesignation()
  }
  addEmployeeModal() {
    this.addEmployeeModalDisplay = true
    console.log("add employee modal should woprk")
  }
  closeAddEmployeeModalDisplay() {
    this.addEmployeeModalDisplay = false
  }
  deleteEmployee(id) {
    let employeeid = id
    this.alertConfirmation(employeeid)
  }
  deleteSelected() {
    for (let i = 0; i < this.selected.length; i++) {
      this.selectedIds.push(this.selected[i].id)
    }
    this.alertConfirmationForAll(this.selectedIds)
  }
  alertConfirmation(employeeid) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then(async (result) => {
      if (result.value) {
        await this.apicallservice.deletePost(employeeid).subscribe(data => console.log('deleted: ', employeeid))
        this.loadData()
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
  alertConfirmationForAll(employeeids: any[]) {
    Swal.fire({
      title: 'Are you sure you want to delete all selected?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then(async (result) => {
      if (result.value) {
        for (let i = 0; i < employeeids.length; i++) {
          console.log(employeeids, 'selected ids')
          await this.apicallservice.deletePost(employeeids[i]).subscribe(data => console.log('deleted: ', employeeids[i]))
        }
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
  editEmployee(row) {
    this.editEmployeeFormdata = row
    this.showEditEmployeeModal = true
    console.log(row.id)
    this.loadData()
    console.log(this.editEmployeeFormdata)
  }
  closeEditEmployeeModalDisplay() {
    this.showEditEmployeeModal = false
  }
  checkDesignation() {
    if (this.data?.data?.role.includes('Admin')) {
      this.Admin = true
    }
    else {
      if (this.data?.data?.role.includes('Manager') && !(this.data.data.role.includes('Admin'))) {
        this.Manager = true
      }
      else {
        this.Developer = true
      }
    }
  }
}
