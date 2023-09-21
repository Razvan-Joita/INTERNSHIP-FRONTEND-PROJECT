import { Component, OnInit } from '@angular/core';
import { RoleModel } from '../../models/role.model';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { RoleState } from '../../states/role.state';
import { GetRoles } from '../../actions/role.action';
import { BaseComponent } from '../basic/base.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent extends BaseComponent {
  roles: RoleModel[] = [];
  displayedColumns: string[] = ['ID', 'name'];

  @Select(RoleState.selectRoles)
  roles$!: Observable<RoleModel[]>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new GetRoles());

    this.roles$.pipe(takeUntil(this.unsubscribe$)).subscribe((roles) => {
      this.roles = roles;
    });
  }
}
