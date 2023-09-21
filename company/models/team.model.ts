export interface TeamModel {
  teamId?: number;
  name?: string;
  description?: string;
  teamLeader?: string;
}

export interface AddTeamRequest{
  name?:string;
  description?:string;
}