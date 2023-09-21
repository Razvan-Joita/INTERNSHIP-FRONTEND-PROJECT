import { AddUserRequest, UserModel } from '../models/user.model';

export class GetUsers {
  static readonly type = '[Users] Get';
  constructor(public filter: UserFilter) {}
}

export interface UserFilter {
  size: number;
  page: number;
  teamId: number;
  positionName: string;
}

export class AddUser {
  static readonly type = '[Users] Add';
  constructor(public user: AddUserRequest) {}
}

export class UpdateUser {
  static readonly type = '[Users] Update';
  constructor(
    public user: UserModel,
    public id: number,
  ) {}
}

export class DeleteUser {
  static readonly type = '[Users] Delete';
  constructor(public id: number) {}
}
