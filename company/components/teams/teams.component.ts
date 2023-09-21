import { Component } from '@angular/core';
import { TeamModel } from '../../models/team.model';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../basic/base.component';
import { TeamState } from '../../states/team.state';
import { GetTeams } from '../../actions/team.action';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent extends BaseComponent {
  teams: TeamModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'description'];

  @Select(TeamState.selectTeams)
  teams$!: Observable<TeamModel[]>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new GetTeams());

    this.teams$.pipe(takeUntil(this.unsubscribe$)).subscribe((teams) => {
      this.teams = teams;
    });
  }
}
