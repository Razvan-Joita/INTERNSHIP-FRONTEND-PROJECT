import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoleComponent } from './add-edit-role.component';

describe('AddEditRoleComponent', () => {
  let component: AddEditRoleComponent;
  let fixture: ComponentFixture<AddEditRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRoleComponent]
    });
    fixture = TestBed.createComponent(AddEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
