import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showProfileOptions:boolean=false
  userName:any
  @Output() dropdownEvent = new EventEmitter<boolean>();
  dropdownShow:boolean=false
  constructor(public dashboard:DashboardComponent) {
    
   }
  userLogged:any
  @Input() username: any
  ngOnInit(): void {
    let fetchedData = sessionStorage.getItem('userLogged')
    let userLoggedData = JSON.parse(atob(fetchedData));
    this.userName=userLoggedData.username
    console.log(this.userName,'username received')
  }
  profileOptions(){
    this.dropdownEvent.emit(this.dropdownShow)
    this.showProfileOptions=!this.showProfileOptions
  }
  logout(){
    sessionStorage.clear()
  }
  changePassword(){
    
  }
}
