import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModal } from './activity-modal';

describe('ActivityModal', () => {
  let component: ActivityModal;
  let fixture: ComponentFixture<ActivityModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
