import { TestBed } from '@angular/core/testing';

import { CommissionService } from './calc-commission.service';

describe('DocumentService', () => {
  let service: CommissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
