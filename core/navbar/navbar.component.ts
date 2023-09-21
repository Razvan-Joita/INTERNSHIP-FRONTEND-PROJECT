import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private modalService: ModalService,
    private router: Router,
  ) {}
  openLoginModal() {
    this.modalService.openLoginModal();
  }
}
