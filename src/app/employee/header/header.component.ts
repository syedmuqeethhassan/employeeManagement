import { Component, Input, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showProfileOptions:boolean=false
  constructor(public dashboard:DashboardComponent) {
    this.userLogged=this.dashboard.loggedPerson?.userName
    console.log(this.dashboard.loggedPerson?.userName,"is this received")
   }
  userLogged:any
  @Input() username: any
  ngOnInit(): void {
    
  }
  profileOptions(){
    this.showProfileOptions=!this.showProfileOptions
  }
  logout(){
    sessionStorage.clear()
  }
  changePassword(){
    
  }
}
