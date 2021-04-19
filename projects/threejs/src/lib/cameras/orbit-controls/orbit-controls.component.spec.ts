import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitControlsComponent } from './orbit-controls.component';

describe('OrbitControlsComponent', () => {
  let component: OrbitControlsComponent;
  let fixture: ComponentFixture<OrbitControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrbitControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
