import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockComponent } from './rock.component';

describe('RockComponent', () => {
  let component: RockComponent;
  let fixture: ComponentFixture<RockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
