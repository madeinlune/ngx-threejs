import { TestBed } from '@angular/core/testing';

import { ThreeJsService } from './three-js.service';

describe('ThreeJsService', () => {
  let service: ThreeJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
