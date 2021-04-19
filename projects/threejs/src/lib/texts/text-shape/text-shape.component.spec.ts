import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextShapeComponent } from './text-shape.component';

describe('TextShapeComponent', () => {
  let component: TextShapeComponent;
  let fixture: ComponentFixture<TextShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
