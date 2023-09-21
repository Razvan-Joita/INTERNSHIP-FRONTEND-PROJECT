import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddEditTeamComponent } from './add-edit-team/add-edit-team.component';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminGuard } from './admin.guard';
import { RolesComponent } from '../company/components/roles/roles.component';
import { TeamsComponent } from '../company/components/teams/teams.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'user',
        component: AddUserComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'role',
        component: AddEditRoleComponent
      },
      {
        path: 'role/:id',
        component: AddEditRoleComponent
      },
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'team',
        component: AddEditTeamComponent
      },
      {
        path: 'team/:id',
        component: AddEditTeamComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
