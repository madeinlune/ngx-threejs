import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsStageComponent } from './three-js-stage.component';

describe('ThreeJsStageComponent', () => {
  let component: ThreeJsStageComponent;
  let fixture: ComponentFixture<ThreeJsStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeJsStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeJsStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
