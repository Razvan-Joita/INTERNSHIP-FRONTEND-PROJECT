import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeamComponent } from './add-edit-team.component';

describe('AddEditTeamComponent', () => {
  let component: AddEditTeamComponent;
  let fixture: ComponentFixture<AddEditTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTeamComponent]
    });
    fixture = TestBed.createComponent(AddEditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
