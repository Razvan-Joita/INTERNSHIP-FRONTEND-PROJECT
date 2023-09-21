import { TeamModel } from './team.model';

export interface PositionModel {
  employeePositionId?: any;
  name?: string;
  description?: string;
  creationDate?: string;
  lastModificationDate?: string;
}

export interface RoleModel {
  id?: number;
  name?: string;
  description?: string;
}

export interface ProjectModel {
  name?: string;
}

export interface EmployeeRoleTeamProjectPositionsModel {
  id?: number;
  employeeId?: number;
  role?: RoleModel;
  team?: TeamModel;
  position?: PositionModel;
  project?: ProjectModel;
  creationDate?: string;
  lastModificationDate?: string;
}

export interface UserModel {
  employeeDetailsId: number;
  firstName: string;
  lastName: string;
  workEmail: string;
  photoURL?: string;
  authRole?: string;
  positionId?: PositionModel;
  employeeRoleTeamProjectPositions?: EmployeeRoleTeamProjectPositionsModel[];
  teams?: TeamModel[];
}

export interface UserLogin {
  workEmail?: string;
  password?: string;
}

export interface Position {
  name?: string;
  description?: string;
}
export interface AddUserRequest {
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  authRole?: string;
  position?: Position;
}
