import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsComponent } from './threejs.component';

describe('ThreejsComponent', () => {
  let component: ThreejsComponent;
  let fixture: ComponentFixture<ThreejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
