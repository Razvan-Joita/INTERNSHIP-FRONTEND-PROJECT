import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../company/components/login/login.component';

@Injectable()
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      backdropClass: 'backdropBackground'
    });
  }
}
