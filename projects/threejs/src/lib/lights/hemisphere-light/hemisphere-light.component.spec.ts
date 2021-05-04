import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HemisphereLightComponent } from './hemisphere-light.component';

describe('HemisphereLightComponent', () => {
  let component: HemisphereLightComponent;
  let fixture: ComponentFixture<HemisphereLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HemisphereLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HemisphereLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
