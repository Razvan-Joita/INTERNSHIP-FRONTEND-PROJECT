import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../../company/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminUser: UserModel = {
    employeeDetailsId: 1,
    firstName: 'Raluca',
    lastName: 'Barzaune',
    workEmail: 'ralucabarzaune@nexttech.ro',
    authRole: 'Admin',
    positionId: { name: 'Java Developer' },
  };
  private moderatorUser: UserModel = {
    employeeDetailsId: 2,
    firstName: 'Diana',
    lastName: 'Dragusin',
    workEmail: 'dianadragusin@nexttech.ro',
    authRole: 'sadas',
    positionId: { name: 'Java Developer' },
  };
  private regularUser: UserModel = {
    employeeDetailsId: 2,
    firstName: 'Oana',
    lastName: 'Puscas',
    workEmail: 'oanapuscas@nexttech.ro',
    authRole: 'Admin',
    positionId: { name: 'Java Developer' },
  };
  private loggedInUser: UserModel | null = null;

  constructor() {}

  public setAdminUser() {
    this.loggedInUser = this.adminUser;
  }

  public getLoggedInUser(): Observable<any> {
    return of(this.loggedInUser);
  }

  isAdmin():boolean{
    return true;
  }
}
