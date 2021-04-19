import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientLightComponent } from './ambiant-light.component';

describe('AmbiantLightComponent', () => {
  let component: AmbientLightComponent;
  let fixture: ComponentFixture<AmbientLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbientLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbientLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
