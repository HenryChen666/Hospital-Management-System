import { TestBed } from '@angular/core/testing';

import { RequestListServiceService } from './request-list-service.service';

describe('RequestListServiceService', () => {
  let service: RequestListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
