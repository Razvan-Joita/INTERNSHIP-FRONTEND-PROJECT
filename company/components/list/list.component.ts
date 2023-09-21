import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { UserModel } from '../../models/user.model';
import { PositionModel } from '../../models/position.model';
import { TeamModel } from '../../models/team.model';
import { ListType } from '../../enum-classes/list-type.config';
import { EMPLOYEE_PAGE_SIZE } from '../../../shared/employee-page-size.const';
import { Observable, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../states/user.state';
import { BaseComponent } from '../basic/base.component';
import { GetUsers, UserFilter } from '../../actions/user.action';
import { TeamState } from '../../states/team.state';
import { GetTeams } from '../../actions/team.action';
import { PositionState } from '../../states/position.state';
import { GetPositions } from '../../actions/position.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  teamInfo!: TeamModel[];
  @Select(TeamState.selectTeams) teamInfo$: Observable<any> | undefined;
  positionInfo!: PositionModel[];
  @Select(PositionState.selectPositions) positionInfo$: Observable<any> | undefined;

  public filtersFormGroup!: FormGroup;
  public ListType = ListType;
  loggedInUser: UserModel | null = null;
  public selectedButton = ListType.BANNERVIEW;
  public teams: TeamModel[] = [

  ];
  public positions: PositionModel[] = [
    { id: 1, name: 'Position 1' },
    { id: 2, name: 'Position 2' },
    { id: 3, name: 'Position 3' },
  ];
  public userList: UserModel[] = [];

  @Select(UserState.selectUsers)
  users$!: Observable<UserModel[]>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    super();
  }
  filters: UserFilter = {
    size: 10,
    page: 1,
    teamId: 0,
    positionName: '',
  };

  ngOnInit(): void {
    this.store.dispatch(new GetUsers(this.filters));

    this.users$.pipe(takeUntil(this.unsubscribe$)).subscribe((users) => {
      this.userList = users;
    });

    this.filtersFormGroup = this.initForm();
    this.initializeFiltersFromUrl();
    this.subscribeToFormChanges();

    this.initializePositionFilter();
    this.initializeTeamFilter();
  }
  public initializeTeamFilter()
  {
    this.store.dispatch(new GetTeams());

    // @ts-ignore
    this.teamInfo$.subscribe((returnData) => {
      this.teamInfo = returnData;
    });
  }
  public initializePositionFilter()
  {
    this.store.dispatch(new GetPositions());

    // @ts-ignore
    this.positionInfo$.subscribe((returnData) => {
      this.positionInfo = returnData;
    });
  }


  public toggleButtons() {
    if (this.selectedButton === ListType.BANNERVIEW) {
      this.selectedButton = ListType.CARDVIEW;
    } else {
      this.selectedButton = ListType.BANNERVIEW;
    }
  }

  currentPage = 1;
  public updateAssets() {
    const startIndex = (this.currentPage - 1) * EMPLOYEE_PAGE_SIZE;
    const endIndex = startIndex + EMPLOYEE_PAGE_SIZE;
    this.userList = this.userList?.slice(startIndex, endIndex);
  }

  public onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updateAssets();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      search: new FormControl(),
      selectedTeam: new FormControl(),
      selectedPosition: new FormControl(),
    });
  }

  public initializeFiltersFromUrl() {
    const queryParams = this.route.snapshot.queryParams;
    this.filtersFormGroup.patchValue({
      search: queryParams['search'] || '',
      selectedTeam: queryParams['selectedTeam']
        ? parseInt(queryParams['selectedTeam'])
        : null,
      selectedPosition: queryParams['selectedPosition']
        ? parseInt(queryParams['selectedPosition'])
        : null,
    });
  }

  public subscribeToFormChanges() {
    this.authService.setAdminUser();
    this.authService.getLoggedInUser().subscribe((user) => {
      this.filtersFormGroup.valueChanges
        .pipe(debounceTime(300))
        .subscribe((newValues: any) => {
          const searchValue = this.filtersFormGroup.get('search')?.value;
          if (searchValue && searchValue.length >= 3) {
            console.log('Search Input Changed:', newValues);
          }
          this.updateQueryParams();
        });
    });
  }

  public updateQueryParams() {
    const queryParams = {
      search: this.filtersFormGroup.get('search')?.value || null,
      selectedTeam: this.filtersFormGroup.get('selectedTeam')?.value || null,
      selectedPosition:
        this.filtersFormGroup.get('selectedPosition')?.value || null,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  protected readonly EMPLOYEE_PAGE_SIZE = EMPLOYEE_PAGE_SIZE;
}
