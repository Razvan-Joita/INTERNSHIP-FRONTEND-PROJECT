import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyNotificationService } from '../../shared/services/company-notification.service';
import { Store } from '@ngxs/store';
import { AddRole } from 'src/app/company/actions/role.action';
import { AddRoleRequest } from 'src/app/company/models/role.model';
import { RoleFields } from 'src/app/company/enum-classes/role-fields.config';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss'],
})
export class AddEditRoleComponent implements OnInit {
  protected form!: FormGroup;
  protected isEdit!: boolean;
  protected id!: number;

  constructor(
    private store:Store,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificationService: CompanyNotificationService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.isEdit = this.id !== undefined;

    //TODO: send a request to service with role id to get the initial role name
    let oldRoleName = 'Old Role Name';

    this.form = this.formBuilder.group({
      roleName: [this.isEdit ? oldRoleName : '', Validators.required]
    });
  }

  public addRole(): void {
    const role: AddRoleRequest = {
      name: this.form.get(RoleFields.NAME)?.value,
  
    };
    this.store.dispatch(new AddRole(role));
    
    //TODO: send role to service
    this.notificationService.showSuccessMessage({
      title: 'Role added successfully!',
      body: `The role ${this.form.value.roleName} was successfully added!`,
    });
    this.form.reset();
  }

  public editRole(): void {
    //TODO: send new role data to service
    this.notificationService.showSuccessMessage({
      title: 'Role updated successfully!',
      body: `Role successfully updated to ${this.form.value.roleName}!`
    });
  }
}
