import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { PositionModel } from '../models/position.model';
import { AddPosition, DeletePosition, GetPosition, GetPositions, UpdatePosition } from '../actions/position.action';
import { PositionService } from '../../shared/services/position.service';


export interface PositionStateModel {
  positions: PositionModel[];
  selectedPosition: PositionModel | null;
}

@State<PositionStateModel>({
  name: 'positionState',
  defaults: {
    positions: [],
    selectedPosition: null,
  }
})
@Injectable()
export class PositionState {

  constructor(private positionService: PositionService) {
  }

  @Selector()
  static selectPositions(state: PositionStateModel): PositionModel[] {
    return state.positions;
  }

  @Action(GetPositions)
  getPositions(ctx: StateContext<PositionStateModel>) {
    return this.positionService.getAllPositions().pipe(tap(returnData => {
      const state = ctx.getState();

      ctx.setState({
        ...state,
        positions: [...returnData]
      });
    }));
  }

  @Action(GetPosition)
  getPosition(ctx: StateContext<PositionStateModel>, action: GetPosition) {
    return this.positionService.getPosition(action.id).pipe(
      tap((position: PositionModel) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          selectedPosition: position,
        });
      })
    );
  }

  @Action(AddPosition)
  addPosition(ctx: StateContext<PositionStateModel>, action: AddPosition) {
    return this.positionService.addPosition(action.position).pipe(tap(() => {
      const state = ctx.getState();

      ctx.patchState({
        positions: [...state.positions, action.position]
      });
    }));
  }

  @Action(UpdatePosition)
  updatePosition(ctx: StateContext<PositionStateModel>, action: UpdatePosition) {
    return this.positionService.updatePosition(action.id, action.position).pipe(tap(() => {
      const state = ctx.getState();

      const updatedTeamList = [...state.positions];
      const index = updatedTeamList.findIndex((team) => team.id === action.id);
      if (index !== -1) {
        updatedTeamList[index] = action.position;
      }

      ctx.patchState({
        positions: updatedTeamList
      });
    }));
  }

  @Action(DeletePosition)
  deletePosition(ctx: StateContext<PositionStateModel>, action: DeletePosition) {
    return this.positionService.deletePosition(action.id).pipe(tap(() => {
      const state = ctx.getState();

      const filteredPositions = state.positions.filter(position =>position.id !== action.id);

      ctx.patchState({
        positions: filteredPositions
      });
    }));
  }
}
