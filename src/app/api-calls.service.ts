import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
 baseurl='http://localhost:3000/employees/'
allData:any
allDataSubject = new Subject<any>();
singleEmployeeSubject=new Subject<any>()
  constructor(private http:HttpClient) { }
  getAllData() : Observable<any>{
    return this.http.get(this.baseurl)
  }

  getLoggedData(id): Observable<any>{
    return this.http.get(this.baseurl+id)
  }
  
  postAddEmployeeFormData(receivedForm:any){
    console.log("post form data is executing")
    return this.http.post<any>(this.baseurl,receivedForm).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        Swal.fire('successful')
      },
      error => {
        console.log('Error', error);
        Swal.fire('unsuccessful')
      }
    );
  }
  deletePost(id) {
    let employeeid=id
    let url=this.baseurl+employeeid
    return this.http.delete(url)
  }
  
  putEmployeeFormData(editEmployeeFormData,id){
    let url=this.baseurl+id
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
  
}
