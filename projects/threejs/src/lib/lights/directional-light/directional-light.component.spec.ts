import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionalLightComponent } from './directional-light.component';

describe('DirectionalLightComponent', () => {
  let component: DirectionalLightComponent;
  let fixture: ComponentFixture<DirectionalLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionalLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionalLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
