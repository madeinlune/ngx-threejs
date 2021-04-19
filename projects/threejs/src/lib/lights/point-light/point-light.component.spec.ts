import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointLightComponent } from './point-light.component';

describe('PointLightComponent', () => {
  let component: PointLightComponent;
  let fixture: ComponentFixture<PointLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
