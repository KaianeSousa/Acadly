import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAdminCard } from './event-admin-card';

describe('EventAdminCard', () => {
  let component: EventAdminCard;
  let fixture: ComponentFixture<EventAdminCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAdminCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAdminCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
