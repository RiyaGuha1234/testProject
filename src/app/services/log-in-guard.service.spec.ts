import { TestBed } from '@angular/core/testing';

import { LogInGuardService } from './log-in-guard.service';

describe('LogInGuardService', () => {
  let service: LogInGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
