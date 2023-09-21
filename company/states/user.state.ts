import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import {
  AddUser,
  DeleteUser,
  GetUsers,
  UpdateUser,
  UserFilter,
} from '../actions/user.action';
import { UserModel } from '../models/user.model';
import { UserService } from '../../shared/services/user.service';
import { throwError } from 'rxjs';
import { CompanyNotificationService } from 'src/app/shared/services/company-notification.service';
import { Navigate } from '@ngxs/router-plugin';

export interface UserStateModel {
  users: UserModel[];
  selectedKey: string;
}

const defaults: UserStateModel = {
  users: [],
  selectedKey: '',
};

@State<UserStateModel>({
  name: 'userState',
  defaults,
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService,
    private notificationService: CompanyNotificationService,
  ) {}

  @Selector()
  static selectUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(GetUsers)
  getUsers(ctx: StateContext<UserStateModel>, action: GetUsers) {
    let users: UserModel[] = ctx.getState().users;
    const key = this.getKeyByUserFilter(action.filter);

    if (key !== ctx.getState().selectedKey) {
      return this.userService.getAllUsers(action.filter).pipe(
        tap((returnData) => {
          ctx.patchState({
            users: returnData,
            selectedKey: key,
          });
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
    } else {
      return throwError(() => 'No API call needed.');
    }
  }

  @Action(AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    return this.userService.addUser(action.user).pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.patchState({
          users: [...state.users, response],
        });
        ctx.dispatch(new Navigate(['/company']));
      },
      (errors) => {
        this.notificationService.showErrorMessage({
          title: 'Error',
          body: `${errors.error.errorMessage}`,
        });
      },),
    );
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: UpdateUser) {
    return this.userService.updateUser(action.id, action.user).pipe(
      tap(() => {
        const state = ctx.getState();

        const updatedUserList = [...state.users];
        const index = updatedUserList.findIndex(
          (user) => user.employeeDetailsId === action.id,
        );
        if (index !== -1) {
          updatedUserList[index] = action.user;
        }

        ctx.patchState({
          users: updatedUserList,
        });
      }),
    );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
    return this.userService.deleteUser(action.id).pipe(
      tap(() => {
        const state = ctx.getState();

        const filteredUsers = state.users.filter(
          (user) => user.employeeDetailsId !== action.id,
        );

        ctx.patchState({
          users: filteredUsers,
        });
      }),
    );
  }

  getKeyByUserFilter(userFilter: UserFilter): string {
    return Object.values(userFilter).join('-');
  }
}
