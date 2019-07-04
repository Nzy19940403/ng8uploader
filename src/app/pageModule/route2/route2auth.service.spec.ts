import { TestBed } from '@angular/core/testing';

import { Route2authService } from './route2auth.service';

describe('Route2authService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Route2authService = TestBed.get(Route2authService);
    expect(service).toBeTruthy();
  });
});
