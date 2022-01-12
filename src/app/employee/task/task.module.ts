import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component : TasksComponent},
];
@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TaskModule { }
