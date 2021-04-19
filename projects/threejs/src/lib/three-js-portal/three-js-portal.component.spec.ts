import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsPortalComponent } from './three-js-portal.component';

describe('ThreeJsPortalComponent', () => {
  let component: ThreeJsPortalComponent;
  let fixture: ComponentFixture<ThreeJsPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeJsPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeJsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
