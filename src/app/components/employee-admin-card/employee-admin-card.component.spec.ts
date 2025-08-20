import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdminCardComponent } from './employee-admin-card.component';

describe('EmployeeAdminCardComponent', () => {
  let component: EmployeeAdminCardComponent;
  let fixture: ComponentFixture<EmployeeAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAdminCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
