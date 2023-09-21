import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddTeamRequest, TeamModel } from 'src/app/company/models/team.model';
import { TeamFields } from '../enum/team-fields.config';
import { UserModel } from 'src/app/company/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyNotificationService } from '../../shared/services/company-notification.service';
import { Store } from '@ngxs/store';
import { AddTeam } from 'src/app/company/actions/team.action';

@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss'],
})
export class AddEditTeamComponent implements OnInit {
  public team!: TeamModel;
  public teamFormGroup!: FormGroup;
  public teamleaders: UserModel[] = [
    // { employeeDetailsId: 1, firstName: 'Gigel',  lastName: 'Popescu', workEmail: 'mail@mail.ro', photoURL: 'url', authRole: {name : "Role Name" , description: "Role Name"}, position: {id : 1 , name: "Position Name"}},
    // { employeeDetailsId: 2, firstName: 'Ionel',  lastName: 'Popescu', workEmail: 'mail@mail.ro', photoURL: 'url', authRole: {name : "Role Name" , description: "Role Name"}, position: {id : 1 , name: "Position Name"}},
    // { employeeDetailsId: 3, firstName: 'Andrei',  lastName: 'Popescu', workEmail: 'mail@mail.ro', photoURL: 'url', authRole: {name : "Role Name" , description: "Role Name"}, position: {id : 1 , name: "Position Name"}},
    // { employeeDetailsId: 4, firstName: 'Bula',  lastName: 'Popescu', workEmail: 'mail@mail.ro', photoURL: 'url', authRole: {name : "Role Name" , description: "Role Name"}, position: {id : 1 , name: "Position Name"}},
  ];
  protected isEdit!: boolean;
  protected id!: number;

  TeamFields = TeamFields;
  public constructor(
    private store:Store,
    private route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: CompanyNotificationService,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.isEdit = (this.id !== undefined);
    //TODO: send a request to service with team id to get the initial team name
    let oldTeamName = 'Old Team Name';
    let oldTeamDescription = 'Old Team Description';
    // let oldTeamTeamLeader = 'Old Team Leader';
    this.teamFormGroup = this.formBuilder.group({
        [TeamFields.NAME]: [this.isEdit ? oldTeamName : '', Validators.required],
        [TeamFields.DESCRIPTION]: [this.isEdit ? oldTeamDescription : ''],
        // [TeamFields.TEAM_LEADER]: [this.isEdit ? oldTeamTeamLeader : '', Validators.required],
    });
  }

  public addTeam(): void {
    const team: AddTeamRequest = {
      name: this.teamFormGroup.get(TeamFields.NAME)?.value,
      description: this.teamFormGroup.get(TeamFields.DESCRIPTION)?.value,
    };
    this.store.dispatch(new AddTeam(team));


    if (this.teamFormGroup.valid) {
      this.notificationService.showSuccessMessage({
        title: 'Team added successfully!',
        body: `The team ${this.teamFormGroup.value["teamName"]} was successfully added!`
    });
      this.teamFormGroup.reset();
    }
  }

  public editTeam(): void {
    //TODO: send new role data to service
    this.notificationService.showSuccessMessage({
      title: 'Team updated successfully!',
      body: `Team successfully updated to ${this.teamFormGroup.value["teamName"]}!`
    });
  }

  public initForm(isEdit = false): FormGroup {
    return this.formBuilder.group({
      [TeamFields.ID]: [isEdit ? this.team.teamId : ''],
      [TeamFields.NAME]: [isEdit ? this.team.name : '', Validators.required],
      [TeamFields.DESCRIPTION]: [isEdit ? this.team.description : ''],
      // [TeamFields.TEAM_LEADER]: [
      //   isEdit ? this.team.teamLeader : '',
      //   Validators.required,
      // ],
    });
  }
}
