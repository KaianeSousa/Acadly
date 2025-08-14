import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInScanner } from './check-in-scanner';

describe('CheckInScanner', () => {
  let component: CheckInScanner;
  let fixture: ComponentFixture<CheckInScanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInScanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInScanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
