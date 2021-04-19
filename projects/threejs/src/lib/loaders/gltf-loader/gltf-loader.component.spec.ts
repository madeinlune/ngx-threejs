import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GltfLoaderComponent } from './gltf-loader.component';

describe('GltfLoaderComponent', () => {
  let component: GltfLoaderComponent;
  let fixture: ComponentFixture<GltfLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GltfLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GltfLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
