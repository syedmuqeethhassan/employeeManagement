import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';
import { from, Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SortType, SelectionType } from '@swimlane/ngx-datatable'
import { ColumnMode } from '@swimlane/ngx-datatable'
import { NgZone } from '@angular/core';
import { SearchFilterPipe } from 'src/app/search-filter.pipe';

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
  loggedPerson: any
  rows: any;
  tempRows:any[];
  select: any
  selected = [];
  editing = {};
  columns = [{ name: 'userName' }, { prop: 'password' }, { prop: 'phoneNumber' }, { prop: 'name' }, { prop: 'gender' }, { prop: 'id' }, { prop: 'age' }, { prop: 'role' }];
  addEmployeeModalDisplay: boolean = false
  jsonServerData: any
  data: any
  id: any
  name: any
  age: any
  gender: any
  role: any
  selectedIds = []
  username: any
  phonenumber: any
  allDataSubject = new Subject<any>();
  changeDataSubject = new Subject<any>();
  showViewEmployeeModal = false
  closeViewEmployeeModal = false
  showEditEmployeeModal = false
  editEmployeeFormdata: any
  Manager: boolean = false
  Developer: boolean = false
  Admin: boolean = false
  adminData: any
  managerData: any
  developerData: any
  editRow: any
  retrievedData: any
  developer: any
  users = 'users'
  logged: string = 'usersList'
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
    this.editing[rowIndex + '-' + cell] = false;
    if (event.target.value) {
      if (this.rows[rowIndex][cell] != '') {
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        this.rows[rowIndex]['id'] = this.rows[rowIndex]._id
        this.apicallservice.putEmployeeFormData(this.rows[rowIndex], this.rows[rowIndex]._id).subscribe(
          (data:any) => {
            let newArr=this.dashboardcomponent.rows.filter(x=>x._id!=this.editEmployeeFormData._id)
        this.dashboardcomponent.rows.length=0
        newArr.push(data)
        this.dashboardcomponent.rows=newArr
        Swal.fire(data.message)
        // this.dashboardcomponent.loadData()
          },
          error => {
            console.log('Error', error);
            Swal.fire(error.message)
          }
        );
      }
    }
    else {
      Swal.fire("enter valid value")
    }
  }
  loadData() {
    this.apicallservice.getAllData().subscribe((receivedData) => {
      this.retrievedData = receivedData.filter(x=>(x.isdelete!=1))
      console.log(receivedData)
      let fetchedData = sessionStorage.getItem('userLogged')
      let userLoggedData = JSON.parse(atob(fetchedData));
      this.loggedPerson = userLoggedData
      if (userLoggedData.role?.includes('Admin')) {
        this.data = this.retrievedData
        for (let i = 0; i < this.data.length; i++) {
          delete (this.data[i].password)
          if (this.data[i]._id == this.loggedPerson._id) {
            this.data.splice(i, 1)
          }
        }
        this.Admin = true
        this.rows = this.data;
        this.tempRows = JSON.parse(JSON.stringify(this.data));
      }
      else if (userLoggedData.role?.includes('Manager')) {
        const managerData = this.retrievedData?.filter(x => (x.role.includes('Developer') || x.role.includes('Manager')) && !x.role.includes('Admin'))
        this.data = managerData
        for (let i = 0; i < this.data?.length; i++) {
          delete (this.data[i].password)
          if (this.data[i]._id == this.loggedPerson._id) {
            this.data.splice(i, 1)
          }
        }
        this.rows = this.data;
        this.tempRows = JSON.parse(JSON.stringify(this.data));
      }
      else if (userLoggedData.role?.includes('Developer')) {
        this.data = [userLoggedData]
        for (let i = 0; i < this.data.length; i++) {
          delete (this.data[i].password)
          if (this.data[i]._id == this.loggedPerson._id) {
            this.data.splice(i, 1)
          }
        }
        this.rows = this.data;
        this.tempRows = JSON.parse(JSON.stringify(this.data));
        this.developer = true
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
      this.selectedIds.push(this.selected[i]._id)
      console.log(this.selectedIds, 'selected IDs')
    }
    this.alertConfirmationForAll(this.selectedIds)
  }
  alertConfirmation(employeeid) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.value) {
        this.apicallservice.deletePost(employeeid).subscribe(
          (data:any) => {
            console.log('deleted: ', data)
            Swal.fire(data.message)
            this.loadData()
          },
          (error:any)=>{
            Swal.fire(error.message)
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'
        )
      }
    })
  }
  async alertConfirmationForAll(employeeids: any[]) {
    Swal.fire({
      title: 'Are you sure you want to delete all selected?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.value) {
        for (let i = 0; i < employeeids.length; i++) {
          console.log(employeeids, 'selected ids')
          this.apicallservice.deletePost(employeeids[i]).subscribe(data =>
            { console.log('deleted: ', employeeids[i])},
            (error:any)=>{
              Swal.fire(error.message)
            }

            )
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Employee still in our database.)',
        )
      }
    })
  }
  editEmployee(row) {
    this.editEmployeeFormdata = row
    this.showEditEmployeeModal = true
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
  search(searchText?: any): any {
    this.rows = this.tempRows;
    if (!searchText) {
      this.rows = this.tempRows;
    }
    
    const finalArr = this.rows.filter((val) => {
      return val.username.toLocaleLowerCase().includes(searchText) ||
      val.phonenumber.toString().includes(searchText);
    });
    this.rows = finalArr;
  }
}
