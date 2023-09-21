import { AddTeamRequest, TeamModel } from '../models/team.model';

export class GetTeams {
  static readonly type = '[Teams] Get';

  constructor() {}
}

export class GetTeam {
  static readonly type = '[Team] Get';

  constructor(public id: number) {}

}

export class AddTeam {
  static readonly type = '[Teams] Add';

  constructor(public team: AddTeamRequest) {}

}

export class UpdateTeam {
  static readonly type = '[Teams] Update';

  constructor(public team: TeamModel, public id: number) {}

}

export class DeleteTeam {
  static readonly type = '[Teams] Delete';

  constructor(public id: number) {
  }

}
