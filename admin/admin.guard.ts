import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { CompanyNotificationService } from '../shared/services/company-notification.service';
import { ToastNotification } from '../company/models/toastNotification';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router, private toasterNotificator: CompanyNotificationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const notification: ToastNotification = {
      title: 'Error',
      body: 'Acces denied'
    }
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.toasterNotificator.showErrorMessage(notification);
      const companyUrl: UrlTree = this.router.parseUrl('/company');
      return companyUrl;
    }
  }
}
