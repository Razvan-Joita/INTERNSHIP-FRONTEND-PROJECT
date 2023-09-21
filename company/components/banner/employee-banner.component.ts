import { Component } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { BaseComponent } from '../basic/base.component';
import { Observable, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../states/user.state';
import {
  AddUser,
  DeleteUser,
  GetUsers,
  UpdateUser,
  UserFilter,
} from '../../actions/user.action';

@Component({
  selector: 'app-employee-banner',
  templateUrl: './employee-banner.component.html',
  styleUrls: ['./employee-banner.component.scss'],
})
export class EmployeeBannerComponent extends BaseComponent {
  title = 'EmployeeTable';
  headers = ['ID', 'Name', 'Work email', 'Position', 'Role'];
  teams = ['ID', 'Name'];
  filters: UserFilter = {
    size: 10,
    page: 1,
    teamId: 0,
    positionName: '',
  };

  public employeeList: UserModel[] = [];

  @Select(UserState.selectUsers)
  users$!: Observable<UserModel[]>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new GetUsers(this.filters));

    this.users$.pipe(takeUntil(this.unsubscribe$)).subscribe((users) => {
      this.employeeList = users;
    });
  }

  public updateUser(user: UserModel, id: number) {
    this.store.dispatch(new UpdateUser(user, id));
  }

  public deleteUser(id: number) {
    this.store.dispatch(new DeleteUser(id));
  }
}
