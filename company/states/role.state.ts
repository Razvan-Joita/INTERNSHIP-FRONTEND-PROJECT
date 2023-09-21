import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AddRole, DeleteRole, GetRoles, UpdateRole } from '../actions/role.action';
import { RoleModel } from '../models/role.model';
import { RoleService } from '../../shared/services/role.service';

export interface RoleStateModel {
  roles: RoleModel[];
}


@State<RoleStateModel>({
  name: 'roleState',
  defaults: {roles:[]}, 
})
@Injectable()
export class RoleState {
  constructor(private roleService: RoleService) { }

  @Selector()
  static selectRoles(state: RoleStateModel) {
    return state.roles;
  }

  @Action(GetRoles)
  getRoles(ctx: StateContext<RoleStateModel>) {
    return this.roleService.getAllRoles().pipe(tap(returnData => {
      const state = ctx.getState();

      ctx.setState({
        ...state,
        roles: [...returnData]
      });
    }));
  }

  @Action(AddRole)
  addRole(ctx: StateContext<RoleStateModel>, action: AddRole) {
    return this.roleService.addRole(action.role).pipe(tap((addedRole) => {
      const state = ctx.getState();

      ctx.patchState({
        roles: [...state.roles, addedRole]
      });
    }));
  }

  @Action(UpdateRole)
  updateRole(ctx: StateContext<RoleStateModel>, action: UpdateRole) {
    return this.roleService.updateRole(action.id, action.role).pipe(tap(() => {
      const state = ctx.getState();

      const updatedRolesList = [...state.roles];
      const index = updatedRolesList.findIndex((role) => role.roleId === action.id);
      if (index !== -1) {
        updatedRolesList[index] = action.role;
      }

      ctx.patchState({
        roles: updatedRolesList
      });
    }));
  }

  @Action(DeleteRole)
  deleteRole(ctx: StateContext<RoleStateModel>, action: DeleteRole) {
    return this.roleService.deleteRole(action.id).pipe(tap(() => {
      const state = ctx.getState();

      const filteredRoles = state.roles.filter(role => role.roleId !== action.id);

      ctx.patchState({
        roles: filteredRoles
      });
    }));
  }
}
