import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveCameraComponent } from './perspective-camera.component';

describe('PerspectiveCameraComponent', () => {
  let component: PerspectiveCameraComponent;
  let fixture: ComponentFixture<PerspectiveCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerspectiveCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
