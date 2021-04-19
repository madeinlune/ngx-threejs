import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbiantLightComponent } from './ambiant-light.component';

describe('AmbiantLightComponent', () => {
  let component: AmbiantLightComponent;
  let fixture: ComponentFixture<AmbiantLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbiantLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbiantLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
