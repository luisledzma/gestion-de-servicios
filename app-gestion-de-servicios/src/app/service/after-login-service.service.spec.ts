import { TestBed } from '@angular/core/testing';

import { AfterLoginServiceService } from './after-login-service.service';

describe('AfterLoginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfterLoginServiceService = TestBed.get(AfterLoginServiceService);
    expect(service).toBeTruthy();
  });
});
