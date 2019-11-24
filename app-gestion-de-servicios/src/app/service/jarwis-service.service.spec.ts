import { TestBed } from '@angular/core/testing';

import { JarwisServiceService } from './jarwis-service.service';

describe('JarwisServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JarwisServiceService = TestBed.get(JarwisServiceService);
    expect(service).toBeTruthy();
  });
});
