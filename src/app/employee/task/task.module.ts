import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormBuilderModule } from  'nz-form-builder';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent
    // children: [
     
     
    // ]
  }
];
@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    CreateTaskComponent,
    
  ],
  imports: [
    CommonModule,
    FormBuilderModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ReactiveFormsModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskModule { }
