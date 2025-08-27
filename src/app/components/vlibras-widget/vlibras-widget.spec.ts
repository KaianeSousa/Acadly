import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlibrasWidget } from './vlibras-widget';

describe('VlibrasWidget', () => {
  let component: VlibrasWidget;
  let fixture: ComponentFixture<VlibrasWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlibrasWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlibrasWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
