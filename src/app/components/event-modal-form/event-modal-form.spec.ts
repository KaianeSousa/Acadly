import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalForm } from './event-modal-form';

describe('EventModalForm', () => {
  let component: EventModalForm;
  let fixture: ComponentFixture<EventModalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventModalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
