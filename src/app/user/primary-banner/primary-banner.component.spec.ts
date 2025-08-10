import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryBannerComponent } from './primary-banner.component';

describe('PrimaryBannerComponent', () => {
  let component: PrimaryBannerComponent;
  let fixture: ComponentFixture<PrimaryBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
