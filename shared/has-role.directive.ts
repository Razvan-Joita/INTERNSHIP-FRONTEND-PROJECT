import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnDestroy {
  private userSubscription!: Subscription;
  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}
  @Input() set appHasRole(roles: string[]) {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.userSubscription = this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        if (user) {
          const isAllowedRole = roles.includes(user.authRole);
          if (isAllowedRole) {
            this.viewContainer.createEmbeddedView(this.template);
          } else {
            this.viewContainer.clear();
          }
        } else {
          this.viewContainer.clear();
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.viewContainer.clear();
      },
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
