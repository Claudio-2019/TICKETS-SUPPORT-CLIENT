import { TestBed } from '@angular/core/testing';

import { AdminsGuard } from './admins.guard';

describe('AdminsGuard', () => {
  let guard: AdminsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
