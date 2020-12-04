import { TestBed } from '@angular/core/testing';

import { RegisterDbService } from './register-db.service';

describe('RegisterDbService', () => {
  let service: RegisterDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
