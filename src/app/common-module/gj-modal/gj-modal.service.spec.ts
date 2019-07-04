import { TestBed } from '@angular/core/testing';

import { GjModalService } from './gj-modal.service';

describe('GjModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GjModalService = TestBed.get(GjModalService);
    expect(service).toBeTruthy();
  });
});
