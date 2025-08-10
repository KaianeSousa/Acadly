import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecundaryBannerComponent } from './secundary-banner.component';

describe('SecundaryBannerComponent', () => {
  let component: SecundaryBannerComponent;
  let fixture: ComponentFixture<SecundaryBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecundaryBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecundaryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
