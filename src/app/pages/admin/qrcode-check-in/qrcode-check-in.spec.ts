import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeCheckIn } from './qrcode-check-in';

describe('QrcodeCheckIn', () => {
  let component: QrcodeCheckIn;
  let fixture: ComponentFixture<QrcodeCheckIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeCheckIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeCheckIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
