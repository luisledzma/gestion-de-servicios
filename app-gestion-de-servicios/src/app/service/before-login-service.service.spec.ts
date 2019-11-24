import { TestBed } from '@angular/core/testing';

import { BeforeLoginServiceService } from './before-login-service.service';

describe('BeforeLoginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeforeLoginServiceService = TestBed.get(BeforeLoginServiceService);
    expect(service).toBeTruthy();
  });
});
