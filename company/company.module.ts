import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CompanyRoutingModule } from './company-routing.module';
import { EmployeeAvatarComponent } from './components/employee-list-cards/employee-avatar/employee-avatar.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeBannerComponent } from './components/banner/employee-banner.component';
import { EmployeeListCardsComponent } from './components/employee-list-cards/employee-list-cards.component';
import { ListComponent } from './components/list/list.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RolesComponent } from './components/roles/roles.component';
import { LoginComponent } from './components/login/login.component';
import { MatTableModule } from '@angular/material/table';
import { TeamsComponent } from './components/teams/teams.component';
import { CoreModule } from '../core/core.module';

import { HasRoleDirective } from '../shared/has-role.directive';
import { AddEditRoleComponent } from "../admin/add-edit-role/add-edit-role.component";
import { AddUserComponent } from "../admin/add-user/add-user.component";

import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    EmployeeBannerComponent,
    EmployeeListCardsComponent,
    ListComponent,
    AddUserComponent,
    EmployeeAvatarComponent,
    RolesComponent,
    LoginComponent,
    TeamsComponent,
    HasRoleDirective,
    AddEditRoleComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompanyModule {}
