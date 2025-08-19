import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModalForm } from './activity-modal-form';

describe('ActivityModalForm', () => {
  let component: ActivityModalForm;
  let fixture: ComponentFixture<ActivityModalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityModalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
