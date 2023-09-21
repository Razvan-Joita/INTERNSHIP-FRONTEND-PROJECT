import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListCardsComponent } from './employee-list-cards.component';

describe('EmployeeCardComponent', () => {
  let component: EmployeeListCardsComponent;
  let fixture: ComponentFixture<EmployeeListCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListCardsComponent],
    });
    fixture = TestBed.createComponent(EmployeeListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
