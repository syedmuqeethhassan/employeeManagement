import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/api-calls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
loggedPerson:any
  constructor(public apiservice:ApiCallsService) { }

  ngOnInit(): void {
    let fetchedData = sessionStorage.getItem('userLogged')
    let userLoggedData = JSON.parse(atob(fetchedData));
    this.loggedPerson=userLoggedData
    // this.apiservice.getLoggedData(this.loggedPerson._id).subscribe(
    //   data => {
    //     console.log('POST Request is successful ', data);
        
    //   },
    //   error => {
    //     console.log('Error', error);
    //     Swal.fire('unsuccessful')
    //   }
    // );
  }

}
