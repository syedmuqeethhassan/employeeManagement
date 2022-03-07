import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateleaveComponent } from './createleave/createleave.component';
import { RouterModule, Routes } from '@angular/router';
import { LeavesdashboardComponent } from './leavesdashboard/leavesdashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeavesComponent } from './leaves.component';

const routes: Routes = [ {
  path: '',
  component: LeavesComponent,
  children: [ {path:'create',component:CreateleaveComponent},
  {path:'leavedashboard',component:LeavesdashboardComponent}
   ]
}]
  
 

@NgModule({
  declarations: [
    CreateleaveComponent,
    LeavesdashboardComponent,
    LeavesComponent
    
  ],
  imports: [RouterModule.forChild(routes),
    CommonModule,ReactiveFormsModule
  ],
  // exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeavesModule { }
