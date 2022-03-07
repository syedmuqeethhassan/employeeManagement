import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  taskurl='http://localhost:3500/tasks/'
 baseurl='http://localhost:3500/users/'
 leaveurl='http://localhost:3500/leaves/'
allData:any
allDataSubject = new Subject<any>();
singleEmployeeSubject=new Subject<any>()
  constructor(private http:HttpClient) { }
  getAllData() : Observable<any>{
    let url=this.baseurl+'users'
    return this.http.get(url)
  }

  getLoggedData(id): Observable<any>{
    let url=this.baseurl+'users'
    return this.http.get(url)
  }
  
  postAddEmployeeFormData(receivedForm:any){
    console.log("post form data is executing")
    let url=this.baseurl+'add-user'
    return this.http.post<any>(url,receivedForm)
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
    let url=this.baseurl+'update/'+ id ;
    return this.http.put<any>(url,editEmployeeFormData)
  }
  login(dataObject){
    let url=this.baseurl+'login'
    return this.http.post<any>(url,dataObject)
  }
  // UpdateEmployeeData(id,dataObject){
  //   const employeeId=id
  //   let url=this.baseurl+employeeId
  //   return this.http.put(url,dataObject)
        
  // }
  postTask(value){
    let url=this.taskurl+'add-task'
    return this.http.post(url,value)
  }
  getAllTask(){
    return this.http.get(this.taskurl)
  }
  deleteTask(row_id){
    let url=this.taskurl+'delete-task/'+row_id
return this.http.delete(url)
  }

  updateTaskData(obj,id){
    obj.updateddate=new Date
    let url=this.taskurl+'update-task/'+id
    return this.http.put(url,obj)
  }

  getUsers(){
    let url=this.baseurl+'get-users'
    return this.http.get(url)
  }
  changePassword(id,passwordObject){
    let url=this.baseurl+'change-password/'+id
    return this.http.post(url,passwordObject)
  }
  addLeave(object){
   let url = this.leaveurl+'/add-leave'
   return this.http.post(url,object)
  }
  fetchLeaves(){
    let url=this.leaveurl+'/leaves'
    return this.http.get(url)
  }
}
