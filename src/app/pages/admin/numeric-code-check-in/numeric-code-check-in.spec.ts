import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericCodeCheckIn } from './numeric-code-check-in';

describe('NumericCodeCheckIn', () => {
  let component: NumericCodeCheckIn;
  let fixture: ComponentFixture<NumericCodeCheckIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericCodeCheckIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericCodeCheckIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
