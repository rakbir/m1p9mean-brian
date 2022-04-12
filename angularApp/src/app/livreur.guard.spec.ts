import { TestBed } from '@angular/core/testing';

import { LivreurGuard } from './livreur.guard';

describe('LivreurGuard', () => {
  let guard: LivreurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LivreurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
