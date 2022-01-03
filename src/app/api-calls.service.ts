import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
allData:any
allDataSubject = new Subject<any>();
singleEmployeeSubject=new Subject<any>()
  constructor(private http:HttpClient) { }
  getAllData() {
    return this.http.get('http://localhost:3000/employees')
  }
  allDatatosubject(){
    this.getAllData().subscribe(
      data=>this.allDataSubject.next({data:data})
    )
  }
  allDataAsObservable(){
    return this.allDataSubject.asObservable
  }
  postAddEmployeeFormData(receivedForm:any){
    console.log("post form data is executing")
    return this.http.post<any>('http://localhost:3000/employees',receivedForm).subscribe(
      data => {
        console.log('POST Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  public deletePost(id) {
    let employeeid=id
    let url='http://localhost:3000/employees/'+employeeid
    return this.http.delete(url)
  }
  putEmployeeFormData(editEmployeeFormData,id){
    let url='http://localhost:3000/employees/'+id
    return this.http.put<any>(url,editEmployeeFormData).subscribe(
      data => {
        console.log('POST Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  // viewEmployee(id){
  //   let employeeid=id
  //   let url='http://localhost:3000/employees/'+employeeid
  //   return this.http.get(url)
  // }
  // singleEmployeeViewSubject(){
  //   this.viewEmployee().subscribe(
  //     data=>this.singleEmployeeSubject.next({data:data})
  //   )
  // }
}
