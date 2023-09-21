import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddUserRequest, UserModel } from '../../company/models/user.model';
import { TeamModel } from '../../company/models/team.model';
import { UserFields } from '../../company/enum-classes/user-fields.config';
import { Store } from '@ngxs/store';
import { AddUser, GetUsers, UserFilter } from 'src/app/company/actions/user.action';
import { CompanyNotificationService } from 'src/app/shared/services/company-notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public user!: UserModel;
  public userFormGroup!: FormGroup;
  public teams: TeamModel[] = [];
  public roles: string[] = [
    'ADMIN',
    'NORMAL_USER'
  ]

  UserFields = UserFields;
  public constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private notificationService: CompanyNotificationService
  ) {}

  public ngOnInit(): void {
    this.userFormGroup = this.initForm();
  }

  public createUser(): void {
    const user: AddUserRequest = {
      firstName: this.userFormGroup.get(UserFields.FIRSTNAME)?.value,
      lastName: this.userFormGroup.get(UserFields.LASTNAME)?.value,
      workEmail: this.userFormGroup.get(UserFields.WORK_EMAIL)?.value,
      authRole: this.userFormGroup.get(UserFields.ROLE)?.value,
      position: {
        name: this.userFormGroup.get(UserFields.POSITION)?.value,
        description: 'Description',
      },
    };
    this.store.dispatch(new AddUser(user));
    if (this.userFormGroup?.valid) {
      this.notificationService.showSuccessMessage({
        title: 'User added successfully!',
        body: `The user ${user.firstName} ${user.lastName} was successfully added!`,
      });
      this.userFormGroup.reset();
    }
  }

  public initForm(isEdit = false): FormGroup {
    return this.formBuilder.group({
      [UserFields.FIRSTNAME]: [
        isEdit ? this.user.firstName : '',
        Validators.required,
      ],
      [UserFields.LASTNAME]: [
        isEdit ? this.user.lastName : '',
        Validators.required,
      ],
      [UserFields.WORK_EMAIL]: [
        isEdit ? this.user.workEmail : '',
        Validators.required,
      ],
      [UserFields.ROLE]: [
        isEdit ? this.user.authRole : '',
        Validators.required,
      ],
      [UserFields.POSITION]: [
        isEdit ? this.user.positionId?.name : '',
        Validators.required,
      ],
      // [UserFields.TEAMS]: [isEdit ? this.user.teams : ''],
    });
  }
}
