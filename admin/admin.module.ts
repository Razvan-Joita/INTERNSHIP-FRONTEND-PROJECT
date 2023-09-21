import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddEditTeamComponent } from './add-edit-team/add-edit-team.component';
import { CoreModule } from '../core/core.module';
import { AdminGuard } from './admin.guard';

@NgModule({
  declarations: [AdminDashboardComponent, AddEditTeamComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, CoreModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [AdminGuard]
})
export class AdminModule { }
