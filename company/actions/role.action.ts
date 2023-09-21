import { RoleModel } from '../models/role.model';

export class GetRoles {
    static readonly type = '[Roles] Get';
    constructor() { }
}

export class AddRole {
    static readonly type = '[Roles] Add';
    constructor(public role: RoleModel) { }
}

export class UpdateRole {
    static readonly type = '[Roles] Update';
    constructor(public role: RoleModel, public id: number) { }
}

export class DeleteRole {
    static readonly type = '[Roles] Delete';
    constructor(public id: number) { }
}