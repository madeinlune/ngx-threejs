import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTdComponent } from './object-td.component';

describe('ObjectTdComponent', () => {
  let component: ObjectTdComponent;
  let fixture: ComponentFixture<ObjectTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
