import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  taskurl='http://localhost:3000/tasks'
 baseurl='http://localhost:3500/users/'
allData:any
allDataSubject = new Subject<any>();
singleEmployeeSubject=new Subject<any>()
  constructor(private http:HttpClient) { }
  getAllData() : Observable<any>{
    return this.http.get(this.baseurl)
  }

  getLoggedData(id): Observable<any>{
    return this.http.get(this.baseurl)
  }
  
  postAddEmployeeFormData(receivedForm:any){
    console.log("post form data is executing")
    let url=this.baseurl+'add-user'
    return this.http.post<any>(url,receivedForm).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        Swal.fire('successful')
      },
      error => {
        console.log('Error', error);
        Swal.fire('unsuccessful in api call service')
      }
    );
  }
  deletePost(id) {
    let employeeid=id
    let url=this.baseurl+'delete/'+employeeid
    return this.http.delete(url)
  }
  getUser(id){
    let url=this.baseurl+id
    return this.http.get(url)
  }
  putEmployeeFormData(editEmployeeFormData,id){
    let url=this.baseurl+'update'
    return this.http.put<any>(url,editEmployeeFormData)
  }
  UpdateEmployeeData(id,dataObject){
    const employeeId=id
    let url=this.baseurl+employeeId
    this.http.put(url,dataObject)
        .subscribe(
          data => {
            console.log('Update Request is successful ', data);
            Swal.fire('update successful')
          },
          error => {
            console.log('Error', error);
            Swal.fire('update unsuccessful')
          }
        );
  }
  postTask(value){
    return this.http.post(this.taskurl,value)
  }
  getAllTask(){
    return this.http.get(this.taskurl)
  }
  deleteTask(rowid){
    let url=this.taskurl+'/'+rowid
return this.http.delete(url)
  }

  updateTaskData(id,obj){
    obj.updateddate=new Date
    let url=this.taskurl+'/'+id
    return this.http.put(url,obj)
  }
}
