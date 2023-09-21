import { Component, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-employee-list-cards',
  templateUrl: './employee-list-cards.component.html',
  styleUrls: ['./employee-list-cards.component.scss'],
})
export class EmployeeListCardsComponent {
  @Input() userList: UserModel[] = [];

  constructor() {}
}
