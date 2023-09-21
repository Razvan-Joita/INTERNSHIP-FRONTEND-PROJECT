import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAvatarComponent } from './employee-avatar.component';

describe('EmployeeAvatarGeneratorComponent', () => {
  let component: EmployeeAvatarComponent;
  let fixture: ComponentFixture<EmployeeAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAvatarComponent],
    });
    fixture = TestBed.createComponent(EmployeeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
