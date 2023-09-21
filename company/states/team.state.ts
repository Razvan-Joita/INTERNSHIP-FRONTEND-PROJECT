import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AddTeam, DeleteTeam, GetTeam, GetTeams, UpdateTeam } from '../actions/team.action';
import { AddTeamRequest, TeamModel } from '../models/team.model';
import { TeamService } from '../../shared/services/team.service';

export interface TeamStateModel {
  teams: TeamModel[];
  selectedTeam: TeamModel | null;
}

@State<TeamStateModel>({
  name: 'teamState',
  defaults: {
    teams: [],
    selectedTeam: null,
  }
})
@Injectable()
export class TeamState {

  constructor(private teamService: TeamService) {
  }

  @Selector()
  static selectTeams(state: TeamStateModel): TeamModel[] {
    return state.teams;
  }

  @Action(GetTeams)
  getTeams(ctx: StateContext<TeamStateModel>) {
    return this.teamService.getAllTeams().pipe(tap(returnData => {
      const state = ctx.getState();

      ctx.setState({
        ...state,
        teams: [...returnData]
      });
    }));
  }

  @Action(GetTeam)
  getTeam(ctx: StateContext<TeamStateModel>, action: GetTeam) {
    return this.teamService.getTeam(action.id).pipe(
      tap((team: TeamModel) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          selectedTeam: team,
        });
      })
    );
  }

  @Action(AddTeam)
  addTeam(ctx: StateContext<TeamStateModel>, action: AddTeam) {
    return this.teamService.addTeam(action.team).pipe(tap((response) => {
      const state = ctx.getState();

      ctx.patchState({
        teams: [...state.teams, response]
      });
    }));
  }

  @Action(UpdateTeam)
  updateTeam(ctx: StateContext<TeamStateModel>, action: UpdateTeam) {
    return this.teamService.updateTeam(action.id, action.team).pipe(tap(() => {
      const state = ctx.getState();

      const updatedTeamList = [...state.teams];
      const index = updatedTeamList.findIndex((team) => team.teamId === action.id);
      if (index !== -1) {
        updatedTeamList[index] = action.team;
      }

      ctx.patchState({
        teams: updatedTeamList
      });
    }));
  }

  @Action(DeleteTeam)
  deleteTeam(ctx: StateContext<TeamStateModel>, action: DeleteTeam) {
    return this.teamService.deleteTeam(action.id).pipe(tap(() => {
      const state = ctx.getState();

      const filteredTeams = state.teams.filter(team => team.teamId !== action.id);

      ctx.patchState({
        teams: filteredTeams
      });
    }));
  }
}
