import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  highlightTab
  Developer:boolean
  constructor( private router: Router) { }

  ngOnInit(): void {
    let fetchedData = sessionStorage.getItem('userLogged')
    let userLoggedData = JSON.parse(atob(fetchedData));
    if(userLoggedData.role=='Developer'){
      this.Developer=true
    }
  }
  highlight(){
    if(this.router.url === "/employee/dashboard"){
      this.highlightTab='dashboard'
    }
     if(this.router.url === "/employee/tasks"){
       this.highlightTab='tasks'
  }
}
}