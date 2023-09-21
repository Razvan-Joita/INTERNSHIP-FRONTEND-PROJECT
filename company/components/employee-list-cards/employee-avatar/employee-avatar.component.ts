import { Component, Input, OnInit } from '@angular/core';
import { ColorUtility } from 'src/app/shared/utils/color-utils';
import { UserColors } from 'src/app/company/enum-classes/avatar-colors';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-employee-avatar',
  templateUrl: './employee-avatar.component.html',
  styleUrls: ['./employee-avatar.component.scss'],
})
export class EmployeeAvatarComponent implements OnInit {
  @Input() user: UserModel | null = null;

  public initialsTextColor: string = '';
  public circleColor: string = '';

  ngOnInit() {
    if (this.user && !this.user.photoURL) {
      this.circleColor = ColorUtility.getColorsForPosition(
        this.user.positionId?.employeePositionId,
      ).backgroundColor;
      this.initialsTextColor = ColorUtility.getColorsForPosition(
        this.user.positionId?.employeePositionId,
      ).initialsColor;
    }
  }

  constructor() {}
}
