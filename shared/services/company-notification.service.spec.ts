import { TestBed } from '@angular/core/testing';

import { CompanyNotificationService } from './company-notification.service';

describe('CompanyNotificationService', () => {
  let service: CompanyNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
