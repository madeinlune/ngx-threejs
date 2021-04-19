import { TestBed } from '@angular/core/testing';

import { ThreeJsFontService } from './three-js-font.service';

describe('ThreeJsFontService', () => {
  let service: ThreeJsFontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeJsFontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
